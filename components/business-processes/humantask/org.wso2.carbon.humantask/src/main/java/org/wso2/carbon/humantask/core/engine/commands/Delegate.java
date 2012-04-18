/*
 * Copyright (c) 2012, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.wso2.carbon.humantask.core.engine.commands;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.wso2.carbon.humantask.core.dao.EventDAO;
import org.wso2.carbon.humantask.core.dao.GenericHumanRoleDAO;
import org.wso2.carbon.humantask.core.dao.OrganizationalEntityDAO;
import org.wso2.carbon.humantask.core.dao.TaskStatus;
import org.wso2.carbon.humantask.core.engine.runtime.api.HumanTaskRuntimeException;

import java.util.ArrayList;
import java.util.List;

/**
 * Delegate operation business logic.
 */
public class Delegate extends AbstractHumanTaskCommand {

    private static final Log log = LogFactory.getLog(Delegate.class);

    private OrganizationalEntityDAO delegatee;

    public Delegate(String callerId, Long taskId, OrganizationalEntityDAO delegatee) {
        super(callerId, taskId);
        this.delegatee = delegatee;
    }

    /**
     * Checks the Pre-conditions before executing the task operation.
     */
    @Override
    protected void checkPreConditions() {

        checkForValidTask(this.getClass());

        //if the delegatee is not an existing user
        if (!engine.getPeopleQueryEvaluator().isExistingUser(delegatee.getName())) {
            String errMsg = String.format("The user[%s] cannot delegate task[id:%d] to the given" +
                                          " delegatee[name:%s] as he/she does not exist in the user store",
                                          caller.getName(), task.getId(), delegatee.getName());
            log.error(errMsg);
            throw new HumanTaskRuntimeException(errMsg);
        }

        //if the task is in reserved or in-progress we have to release it first.
        if (TaskStatus.RESERVED.equals(task.getStatus()) || TaskStatus.IN_PROGRESS.equals(task.getStatus())) {

            //task releasing can be done only by bus admins and the actual owner.
            List<GenericHumanRoleDAO.GenericHumanRoleType> allowedRoles = new
                    ArrayList<GenericHumanRoleDAO.GenericHumanRoleType>();
            allowedRoles.add(GenericHumanRoleDAO.GenericHumanRoleType.BUSINESS_ADMINISTRATORS);
            allowedRoles.add(GenericHumanRoleDAO.GenericHumanRoleType.ACTUAL_OWNER);
            try {
                authoriseRoles(allowedRoles, this.getClass());
            } catch (Exception ex) {
                String err = String.format("The task[id:%d] can be only delegated after it's released. " +
                                           "But for the task to be released you need to be a business " +
                                           "administrator or the actual owner of the task. " +
                                           "Given user[%s] is not in those roles!",
                                           task.getId(), caller.getName());
                log.error(err);
                throw new HumanTaskRuntimeException(err, ex);
            }


            task.release();
        }

        GenericHumanRoleDAO potentialOwnersRole = task.getGenericHumanRole(
                GenericHumanRoleDAO.GenericHumanRoleType.POTENTIAL_OWNERS);

        if (engine.getPeopleQueryEvaluator().isOrgEntityInRole(delegatee,
                                                               potentialOwnersRole)) {
            task.persistToPotentialOwners(delegatee);
        }
    }

    /**
     * Perform the authorization checks before executing the task operation.
     */
    @Override
    protected void authorise() {
        List<GenericHumanRoleDAO.GenericHumanRoleType> allowedRoles = new
                ArrayList<GenericHumanRoleDAO.GenericHumanRoleType>();
        allowedRoles.add(GenericHumanRoleDAO.GenericHumanRoleType.POTENTIAL_OWNERS);
        allowedRoles.add(GenericHumanRoleDAO.GenericHumanRoleType.STAKEHOLDERS);
        allowedRoles.add(GenericHumanRoleDAO.GenericHumanRoleType.ACTUAL_OWNER);

        authoriseRoles(allowedRoles, this.getClass());
    }

    /**
     * Perform the state checks before executing the task operation.
     */
    @Override
    protected void checkState() {
        List<TaskStatus> allowedStates = new ArrayList<TaskStatus>();
        allowedStates.add(TaskStatus.READY);
        allowedStates.add(TaskStatus.RESERVED);
        allowedStates.add(TaskStatus.IN_PROGRESS);
        checkPreStates(allowedStates, this.getClass());
    }

    /**
     * Checks the post-conditions after executing the task operation.
     */
    @Override
    protected void checkPostConditions() {
        checkPostState(TaskStatus.RESERVED, this.getClass());
    }

    @Override
    protected EventDAO createTaskEvent() {
        EventDAO taskEvent = super.createTaskEvent();
        taskEvent.setDetails("");
        return taskEvent;
    }

    @Override
    public void execute() {
        checkPreConditions();
        authorise();
        checkState();
        task.delegate(delegatee);
        task.persistEvent(createTaskEvent());
        checkPostConditions();
    }
}

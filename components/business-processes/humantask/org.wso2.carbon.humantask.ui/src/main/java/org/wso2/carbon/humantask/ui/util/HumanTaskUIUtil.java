/*
 * Copyright (c) WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

package org.wso2.carbon.humantask.ui.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.wso2.carbon.humantask.stub.ui.task.client.api.types.TComment;
import org.wso2.carbon.humantask.stub.ui.task.client.api.types.TPresentationName;
import org.wso2.carbon.humantask.stub.ui.task.client.api.types.TPresentationSubject;
import org.wso2.carbon.humantask.stub.ui.task.client.api.types.TTaskAbstract;
import org.wso2.carbon.humantask.stub.ui.task.client.api.types.TTaskAuthorisationParams;
import org.wso2.carbon.humantask.stub.ui.task.client.api.types.TTaskEvent;
import org.wso2.carbon.humantask.stub.ui.task.client.api.types.TTaskEvents;

import java.util.LinkedHashMap;

/**
 * The utility methods used in the human task ui bundle.
 */
public class HumanTaskUIUtil {

    private static Log log = LogFactory.getLog(HumanTaskUIUtil.class);

    /**
     * Returns the unDeploy link of the human task package.
     *
     * @param packageName : The package name.
     * @return : The unDeploy link for the given package name.
     */
    public static String getUnDeployLink(String packageName) {
        return "humantask_definition_list.jsp?operation=unDeploy&packageName=" + packageName;
    }


    public static String encodeXML(String xmlString) {
        if (xmlString != null && xmlString.length() != 0) {
            xmlString = xmlString.replaceAll("<", "&lt;");
            xmlString = xmlString.replaceAll(">", "&gt;");
            xmlString = xmlString.replaceAll("\n", "");
        }
        return xmlString;
    }

    public static void logInfo(String string) {
        log.info(string);
    }

    public static void logError(Object error, Throwable ex) {
        log.error(error, ex);
    }

    public static String getCookieSessionId(String cookie) {
        if (cookie != null && cookie.contains("JSESSIONID=")) {
            int startIndex = cookie.lastIndexOf("JSESSIONID=");
            int lastIndex = startIndex + 43;
            return cookie.substring(startIndex, lastIndex);
        }
        return null;
    }

    /**
     * Creates a task header based on the presentation subject or the presentation name provided.
     *
     * @param pName : Presentation name.
     * @param pSub  : Presentation subject.
     * @return :  If the presentation subject is not empty it would return it
     *         If the presentation name is not empty it would return the name
     *         If both the subject and the name is empty, an empty String would be returned.
     */
    public static String getTaskPresentationHeader(TPresentationSubject pSub,
                                                   TPresentationName pName) {
        String presentationName = "";
        if (pSub != null && pSub.getTPresentationSubject() != null) {
            presentationName = pSub.getTPresentationSubject();
        } else if (pName != null && pName.getTPresentationName() != null) {
            presentationName = pName.getTPresentationName();
        }
        return presentationName;
    }

    /**
     * Gets the presentation id of the task.
     *
     * @param task : The task object.
     * @return : The presentation id.
     */
    public static String getTaskDisplayId(TTaskAbstract task) {
        return task.getName().getLocalPart() + "-" + task.getId().toString();
    }

    /**
     * Builds a JSON String representing the task details.
     *
     * @param task : The task object.
     * @return : The JSON representation of the task details.
     */
    public static String loadTaskDetailsJSONString(TTaskAbstract task) {
        JSONObject taskDetailsJSONObject = new JSONObject();

        if (task != null) {
            if (task.getPresentationSubject() != null) {
                taskDetailsJSONObject.put("taskPresentationSubject",
                                          task.getPresentationSubject().toString());
            }

            if (task.getStatus() != null) {
                taskDetailsJSONObject.put("taskStatus", task.getStatus().toString().trim());
            }

            if (task.getPreviousStatus() != null &&
                !"".equals(task.getPreviousStatus().toString().trim())) {
                taskDetailsJSONObject.put("taskPreviousStatus",
                                          task.getPreviousStatus().toString().trim());
            }

            taskDetailsJSONObject.put("taskPriority", task.getPriority().toString());
            taskDetailsJSONObject.put("taskCreatedOn", task.getCreatedTime().getTime().toString());
            taskDetailsJSONObject.put("taskCreatedBy", "");

            if (task.getUpdatedTime() != null) {
                taskDetailsJSONObject.put("taskUpdatedOn", task.getUpdatedTime().getTime().toString());
            }
            taskDetailsJSONObject.put("taskUpdatedBy", "");

            if (task.getPresentationName() != null) {
                taskDetailsJSONObject.put("taskPresentationName", task.getPresentationName().toString());
            }
            if (task.getActualOwner() != null) {
                taskDetailsJSONObject.put("taskOwner", task.getActualOwner().toString());
            }
            taskDetailsJSONObject.put("taskType", task.getTaskType());

            if (task.getPresentationDescription() != null) {
                taskDetailsJSONObject.put("taskPresentationDescription",
                                          task.getPresentationDescription().toString());
            }
        }

        return taskDetailsJSONObject.toJSONString();
    }

    /**
     * Builds a JSON string representing the task authentication parameters.
     *
     * @param authParams : The auth parameters object
     * @return : The converted JSON String.
     */
    public static String loadTaskAuthParamsJSONString(TTaskAuthorisationParams authParams) {
        JSONObject taskAuthParamsJSON = new JSONObject();

        if (authParams != null) {
            taskAuthParamsJSON.put("authorisedToActivate", authParams.getAuthorisedToActivate());
            taskAuthParamsJSON.put("authorisedToClaim", authParams.getAuthorisedToClaim());
            taskAuthParamsJSON.put("authorisedToComment", authParams.getAuthorisedToComment());
            taskAuthParamsJSON.put("authorisedToComplete", authParams.getAuthorisedToComplete());
            taskAuthParamsJSON.put("authorisedToDelegate", authParams.getAuthorisedToDelegate());
            taskAuthParamsJSON.put("authorisedToDeleteFault", authParams.getAuthorisedToDeleteFault());
            taskAuthParamsJSON.put("authorisedToDeleteComment", authParams.getAuthorisedToDeleteComment());
            taskAuthParamsJSON.put("authorisedToDeleteOutput", authParams.getAuthorisedToDeleteOutput());
            taskAuthParamsJSON.put("authorisedToExit", authParams.getAuthorisedToExit());
            taskAuthParamsJSON.put("authorisedToFail", authParams.getAuthorisedToFail());
            taskAuthParamsJSON.put("authorisedToForward", authParams.getAuthorisedToForward());
            taskAuthParamsJSON.put("authorisedToGetComments", authParams.getAuthorisedToGetComments());
            taskAuthParamsJSON.put("authorisedToGetDescription", authParams.getAuthorisedToGetDescription());
            taskAuthParamsJSON.put("authorisedToGetInput", authParams.getAuthorisedToGetInput());
            taskAuthParamsJSON.put("authorisedToNominate", authParams.getAuthorisedToNominate());
            taskAuthParamsJSON.put("authorisedToRelease", authParams.getAuthorisedToRelease());
            taskAuthParamsJSON.put("authorisedToResume", authParams.getAuthorisedToResume());
            taskAuthParamsJSON.put("authorisedToSetFault", authParams.getAuthorisedToSetFault());
            taskAuthParamsJSON.put("authorisedToSetOutput", authParams.getAuthorisedToSetOutput());
            taskAuthParamsJSON.put("authorisedToSetPriority", authParams.getAuthorisedToSetPriority());
            taskAuthParamsJSON.put("authorisedToSkip", authParams.getAuthorisedToSkip());
            taskAuthParamsJSON.put("authorisedToStart", authParams.getAuthorisedToStart());
            taskAuthParamsJSON.put("authorisedToStop", authParams.getAuthorisedToStop());
            taskAuthParamsJSON.put("authorisedToSuspend", authParams.getAuthorisedToSuspend());
            taskAuthParamsJSON.put("authorisedToUpdateComment", authParams.getAuthorisedToUpdateComment());
        }

        return taskAuthParamsJSON.toJSONString();
    }

    /**
     * Builds a JSON representation of task comments.
     *
     * @param comments : The comment objects:
     * @return : The JSON string.
     */
    public static String loadTaskCommentsJSONString(TComment[] comments) {
        LinkedHashMap<String, JSONObject> commentsMap = new LinkedHashMap<String, JSONObject>();
        if (comments != null) {
            for (TComment comment : comments) {
                JSONObject commentObject = new JSONObject();
                commentObject.put("commentId", comment.getId().toString());
                commentObject.put("commentText", comment.getText());

                if (comment.getAddedBy() != null) {
                    commentObject.put("commentAddedBy",
                                      comment.getAddedBy().getTUser());
                }

                if (comment.getAddedTime() != null) {
                    commentObject.put("commentAddedTime",
                                      comment.getAddedTime().getTime().toString());
                }

                if (comment.getLastModifiedBy() != null) {
                    commentObject.put("commentLastModifiedBy",
                                      comment.getLastModifiedBy().getTUser());
                }

                if (comment.getLastModifiedTime() != null) {
                    commentObject.put("commentLastModifiedTime",
                                      comment.getLastModifiedTime().getTime().toString());
                }
                commentsMap.put(comment.getId().toString(), commentObject);
            }
        }

        return JSONObject.toJSONString(commentsMap);
    }

    /**
     * Builds a JSON representation of task events.
     * @param taskEvents : The task events list.
     *
     * @return : The json string for the given task events list.
     */
    public static String loadTaskEventsJSONString(TTaskEvents taskEvents) {
        LinkedHashMap<String, JSONObject> taskEventsMap = new LinkedHashMap<String, JSONObject>();
        if (taskEvents != null && taskEvents.getEvent() != null) {
            for (TTaskEvent taskEvent : taskEvents.getEvent()) {
                JSONObject eventJSON = new JSONObject();
                eventJSON.put("eventId", taskEvent.getEventId().toString());
                if (taskEvent.getEventDetail() != null) {
                    eventJSON.put("eventDetail", taskEvent.getEventDetail());
                }

                if (taskEvent.getOldState() != null) {
                    eventJSON.put("oldState", taskEvent.getOldState().toString());
                }

                if (taskEvent.getNewState() != null) {
                    eventJSON.put("newState", taskEvent.getNewState().toString());
                }

                eventJSON.put("eventInitiator", taskEvent.getEventInitiator().getTUser());
                eventJSON.put("eventType", taskEvent.getEventType());

                if (taskEvent.getEventTime() != null) {
                    eventJSON.put("eventTime",
                                  taskEvent.getEventTime().getTime().toString());
                }

                taskEventsMap.put(taskEvent.getEventId().toString(), eventJSON);
            }
        }

        return JSONObject.toJSONString(taskEventsMap);
    }
}

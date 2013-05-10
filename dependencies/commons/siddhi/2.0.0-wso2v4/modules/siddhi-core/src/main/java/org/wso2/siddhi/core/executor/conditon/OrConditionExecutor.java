/*
*  Copyright (c) 2005-2010, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
*  WSO2 Inc. licenses this file to you under the Apache License,
*  Version 2.0 (the "License"); you may not use this file except
*  in compliance with the License.
*  You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
package org.wso2.siddhi.core.executor.conditon;

import org.wso2.siddhi.core.event.AtomicEvent;
import org.wso2.siddhi.query.api.definition.TableDefinition;

import java.util.Set;

public class OrConditionExecutor implements ConditionExecutor {

    public ConditionExecutor leftConditionExecutor;
    public ConditionExecutor rightConditionExecutor;

    public OrConditionExecutor(ConditionExecutor leftConditionExecutor,
                               ConditionExecutor rightConditionExecutor) {
        this.leftConditionExecutor = leftConditionExecutor;
        this.rightConditionExecutor = rightConditionExecutor;
    }

    public boolean execute(AtomicEvent event) {
        return leftConditionExecutor.execute(event) || rightConditionExecutor.execute(event);
    }

    @Override
    public String constructFilterQuery(AtomicEvent newEvent, int level) {
        return constructQuery(newEvent, level, null);
    }

    @Override
    public String constructSQLPredicate(AtomicEvent newEvent, TableDefinition tableDefinition) {
        return constructQuery(newEvent, SQL_LEVEL, tableDefinition);

    }

    public String constructQuery(AtomicEvent newEvent, int level, TableDefinition tableDefinition) {
        String left, right;
        if (level == SQL_LEVEL) {
            left = leftConditionExecutor.constructSQLPredicate(newEvent, tableDefinition);
            right = rightConditionExecutor.constructSQLPredicate(newEvent, tableDefinition);
        } else {
            left = leftConditionExecutor.constructFilterQuery(newEvent, 1);
            right = rightConditionExecutor.constructFilterQuery(newEvent, 1);

        }
        if (left.equals("*") && right.equals("*")) {
            return "*";
        } else {
            StringBuilder sb = new StringBuilder();
            sb.append("(").append(left).append(") or (").append(right).append(")");
            return sb.toString();
        }
    }

}

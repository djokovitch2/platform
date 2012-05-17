/*
 * Copyright (c) 2006, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

package org.wso2.carbon.mediator.transform;

import org.apache.synapse.MessageContext;
import org.apache.synapse.SynapseLog;
import org.apache.synapse.config.SynapseConfigUtils;
import org.apache.synapse.config.Entry;
import org.apache.synapse.config.SynapseConfiguration;
import org.apache.synapse.mediators.AbstractMediator;
//import org.milyn.BAM;
//import org.milyn.container.ExecutionContext;
import org.xml.sax.SAXException;

import javax.xml.transform.stream.StreamSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;








import org.apache.axis2.description.AxisService;
import org.apache.axis2.engine.AxisConfiguration;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.synapse.Mediator;
import org.apache.synapse.MessageContext;
import org.apache.synapse.core.axis2.Axis2MessageContext;
import org.wso2.carbon.agent.Agent;
import org.wso2.carbon.agent.DataPublisher;
import org.wso2.carbon.agent.commons.Event;
import org.wso2.carbon.agent.commons.exception.*;
import org.wso2.carbon.agent.conf.AgentConfiguration;
import org.wso2.carbon.agent.exception.AgentException;
import org.wso2.carbon.agent.exception.TransportException;
import org.wso2.carbon.core.multitenancy.SuperTenantCarbonContext;

import java.net.MalformedURLException;

/**
 * Transforms the current message payload using the given BAM configuration.
 * The current message context is replaced with the result as XML.
 */
public class BamMediator extends AbstractMediator {

    private static final Log log = LogFactory.getLog(BamMediator.class);
    private static final String ADMIN_SERVICE_PARAMETER = "adminService";
    private static final String HIDDEN_SERVICE_PARAMETER = "hiddenService";

    private String varible1 = "10";

    private String varible2 = "10";

    //private int varible3 = 0;

    private String streamId = null;
    //private AgentConfiguration agentConfiguration = null;
    //private Agent agent = null;
    private DataPublisher dataPublisher = null;

    public BamMediator() {

    }

    public boolean mediate(MessageContext mc) {



        SynapseLog synLog = getLog(mc);

        if (synLog.isTraceOrDebugEnabled()) {
            synLog.traceOrDebug("Start : BAM mediator");

            if (synLog.isTraceTraceEnabled()) {
                synLog.traceTrace("Message : " + mc.getEnvelope());
            }
        }

        // check weather we need to create the bam configuration
        lock.lock();
        try {
            if (isCreationOrRecreationRequired(mc.getConfiguration())) {
                //bam = createBamConfig(synCtx);
            }
        } finally {
            lock.unlock();
        }






        // Do somthing useful..
        // Note the access to the Synapse Message context
        org.apache.axis2.context.MessageContext msgCtx = ((Axis2MessageContext) mc).getAxis2MessageContext();

        AxisService service = msgCtx.getAxisService();
        if (service == null ||
            service.getParameter(ADMIN_SERVICE_PARAMETER) != null ||
            service.getParameter(HIDDEN_SERVICE_PARAMETER) != null) {
            return true;
        }

        AxisConfiguration axisConfiguration = msgCtx.getConfigurationContext().getAxisConfiguration();
        int tenantId = SuperTenantCarbonContext.getCurrentContext(axisConfiguration).getTenantId();
//        Map<Integer, ActivityConfigData> tenantSpecificActivity = TenantActivityConfigData.getTenantSpecificEventingConfigData();
//        ActivityConfigData activityConfigData = tenantSpecificActivity.get(tenantId);
        try {
            logMessage(tenantId, mc);
        } catch (AgentException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } catch (MalformedStreamDefinitionException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } catch (StreamDefinitionException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } catch (WrongEventTypeException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } catch (DifferentStreamDefinitionAlreadyDefinedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } catch (MalformedURLException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } catch (AuthenticationException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } catch (TransportException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }




        if (synLog.isTraceOrDebugEnabled()) {
            synLog.traceOrDebug("End : BAM mediator");

            if (synLog.isTraceTraceEnabled()) {
                synLog.traceTrace("Message : " + mc.getEnvelope());
            }
        }




        return true;
    }

    public String getType() {
        return null;
    }

    public void setTraceState(int traceState) {
        traceState = 0;
    }

    public int getTraceState() {
        return 0;
    }

    public void setvarible1(String newValue) {
        varible1 = newValue;
    }

    public String getvarible1() {
        return varible1;
    }

    public void setvarible2(String newValue) {
        varible2 = newValue;
    }

    public String getvarible2() {
        return varible2;
    }

    public void setDescription(String s) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    public String getDescription() {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    private void logMessage(int tenantId, MessageContext messageContext) throws AgentException, MalformedStreamDefinitionException, StreamDefinitionException, WrongEventTypeException, DifferentStreamDefinitionAlreadyDefinedException, MalformedURLException, AuthenticationException, TransportException {

        if (streamId == null) {
            AgentConfiguration agentConfiguration = new AgentConfiguration();
            agentConfiguration.setTrustStore("/works/platform_trunk/graphite/components/agent/org.wso2.carbon.agent.server/src/test/resources/client-truststore.jks");
            agentConfiguration.setTrustStorePassword("wso2carbon");
            Agent agent = new Agent(agentConfiguration);
            //create data publisher
            dataPublisher = new DataPublisher("tcp://localhost:7612", "admin", "admin", agent);

            //Define event stream
            streamId = dataPublisher.defineEventStream("{" +
                                                       "  'name':'org.wso2.carbon.mediator.bam.BamMediator'," +
                                                       "  'version':'1.0.0'," +
                                                       "  'nickName': 'Log'," +
                                                       "  'description': 'log to bam'," +
                                                       "  'metaData':[" +
                                                       "          {'name':'ProductName','type':'STRING'}" +
                                                       "  ]," +
                                                       "  'payloadData':[" +
                                                       "          {'name':'TenantId','type':'INT'}," +
                                                       "          {'name':'MessageId','type':'STRING'}," +
                                                       "          {'name':'SOAPHeaddr','type':'STRING'}," +
                                                       "          {'name':'SOAPBody','type':'STRING'}" +
                                                       "  ]" +
                                                       "}");
            log.info("Event Stream Created.");
        }
        //Publish event for a valid stream
        if (streamId != null && !streamId.isEmpty()) {
            log.info("Stream ID: " + streamId);
            // Event for the message
            Event eventJohnOne = new Event(streamId, System.currentTimeMillis(), new Object[]{"external"}, null,
                                           new Object[]{tenantId, messageContext.getMessageID(), messageContext.getEnvelope().getHeader().toString(), messageContext.getEnvelope().getBody().toString()});
            dataPublisher.publish(eventJohnOne);
        } else {
            log.info("streamId is empty.");
        }
    }


















    //

    /** BAM configuration file */
    private String configKey = null;
    /** This lock is used to create the bam configuration synchronously */
    private volatile Lock lock = new ReentrantLock();

/*    public boolean mediate(MessageContext synCtx) {
        SynapseLog synLog = getLog(synCtx);

        if (synLog.isTraceOrDebugEnabled()) {
            synLog.traceOrDebug("Start : BAM mediator");

            if (synLog.isTraceTraceEnabled()) {
                synLog.traceTrace("Message : " + synCtx.getEnvelope());
            }
        }

        // check weather we need to create the bam configuration
        lock.lock();
        try {
            if (isCreationOrRecreationRequired(synCtx.getConfiguration())) {
                //bam = createBamConfig(synCtx);
            }
        } finally {
            lock.unlock();
        }

        // Code of mediation here.

        if (synLog.isTraceOrDebugEnabled()) {
            synLog.traceOrDebug("End : BAM mediator");

            if (synLog.isTraceTraceEnabled()) {
                synLog.traceTrace("Message : " + synCtx.getEnvelope());
            }
        }

        return true;
    }*/

    /**
     * Create the smoooks configuration from the configuration key. BAM configuration can be
     * stored as a local entry or can be stored in the registry.
     * //@param synCtx synapse context
     * @return BAM configuration
     */
    /*private BAM createBamConfig(MessageContext synCtx) {

        return null;
    }*/

    private boolean isCreationOrRecreationRequired(SynapseConfiguration synCfg) {
        // if there are no cachedTemplates we need to create a one
        /*if (smooks == null) {
            // this is a creation case
            return true;
        } else {
            // build transformer - if necessary
            Entry dp = synCfg.getEntryDefinition(configKey);
            // if the smooks config key refers to a dynamic resource, and if it has been expired
            // it is a recreation case
            boolean shouldRecreate = dp != null && dp.isDynamic() && (!dp.isCached() || dp.isExpired());
            if (shouldRecreate) {
                // we should clear all the existing resources
                smooks.close();
            }
            return shouldRecreate;
        }*/
        return false;
    }

    public String getConfigKey() {
        return configKey;
    }

    public void setConfigKey(String configKey) {
        this.configKey = configKey;
    }

}
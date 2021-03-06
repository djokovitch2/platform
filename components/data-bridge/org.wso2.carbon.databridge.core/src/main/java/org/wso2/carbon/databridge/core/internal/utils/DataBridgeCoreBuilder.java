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
package org.wso2.carbon.databridge.core.internal.utils;

import org.apache.axiom.om.OMElement;
import org.apache.axiom.om.impl.builder.StAXOMBuilder;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.wso2.carbon.databridge.core.conf.DataBridgeConfiguration;
import org.wso2.carbon.databridge.core.exception.DataBridgeConfigurationException;
import org.wso2.carbon.utils.ServerConstants;

import javax.xml.namespace.QName;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

/**
 * Helper class to build Agent Server Initial Configurations
 */
public final class DataBridgeCoreBuilder {

    private static final Log log = LogFactory.getLog(DataBridgeCoreBuilder.class);

    private DataBridgeCoreBuilder() {
    }

    public static OMElement loadConfigXML() throws DataBridgeConfigurationException {

        String carbonHome = System.getProperty(ServerConstants.CARBON_CONFIG_DIR_PATH);
        String path = carbonHome + File.separator + DataBridgeConstants.DATA_BRIDGE_DIR + File.separator + DataBridgeConstants.DATA_BRIDGE_CONFIG_XML;

        BufferedInputStream inputStream = null;
        try {
            inputStream = new BufferedInputStream(new FileInputStream(new File(path)));
            XMLStreamReader parser = XMLInputFactory.newInstance().
                    createXMLStreamReader(inputStream);
            StAXOMBuilder builder = new StAXOMBuilder(parser);
            OMElement omElement = builder.getDocumentElement();
            omElement.build();
            return omElement;
        } catch (FileNotFoundException e) {
            String errorMessage = DataBridgeConstants.DATA_BRIDGE_CONFIG_XML
                                  + "cannot be found in the path : " + path;
            log.error(errorMessage, e);
            throw new DataBridgeConfigurationException(errorMessage, e);
        } catch (XMLStreamException e) {
            String errorMessage = "Invalid XML for " + DataBridgeConstants.DATA_BRIDGE_CONFIG_XML
                                  + " located in the path : " + path;
            log.error(errorMessage, e);
            throw new DataBridgeConfigurationException(errorMessage, e);
        } finally {
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
            } catch (IOException e) {
                String errorMessage = "Can not close the input stream";
                log.error(errorMessage, e);
            }
        }
    }

    public static void populateStreamDefinitions(OMElement config,
                                                      List<String[]> streamDefinitionList) {
        OMElement streamDefinitions = config.getFirstChildWithName(
                new QName(DataBridgeConstants.DATA_BRIDGE_NAMESPACE,
                          DataBridgeConstants.STREAM_DEFINITIONS_ELEMENT));

        if (streamDefinitions != null) {
            for (Iterator streamDefinitionIterator = streamDefinitions.getChildElements();
                 streamDefinitionIterator.hasNext(); ) {
                OMElement streamDefinition = (OMElement) streamDefinitionIterator.next();
                String domainName = streamDefinition.getAttributeValue(new QName(DataBridgeConstants.DOMAIN_NAME_ATTRIBUTE));

                streamDefinitionList.add(new String[]{domainName, streamDefinition.getText()});
            }
        }
    }


    public static void populateStreamDefinitionStore(OMElement config,
                                                     DataBridgeConfiguration dataBridgeConfiguration) {
        OMElement streamDefinitionStore = config.getFirstChildWithName(
                new QName(DataBridgeConstants.DATA_BRIDGE_NAMESPACE,
                          DataBridgeConstants.STREAM_DEFINITION_STORE_ELEMENT));
        if (streamDefinitionStore != null) {
            dataBridgeConfiguration.setStreamDefinitionStoreName(streamDefinitionStore.getText());
        }

    }

    public static void populateRuntimeParameters(OMElement config,
                                                 DataBridgeConfiguration dataBridgeConfiguration) {
        OMElement workerThreads = config.getFirstChildWithName(
                new QName(DataBridgeConstants.DATA_BRIDGE_NAMESPACE,
                          DataBridgeConstants.WORKER_THREADS_ELEMENT));
        if (workerThreads != null) {
            try {
                dataBridgeConfiguration.setWorkerThreads(Integer.parseInt(workerThreads.getText()));
            } catch (NumberFormatException ignored) {

            }
        }
        OMElement eventBufferCapacity = config.getFirstChildWithName(
                new QName(DataBridgeConstants.DATA_BRIDGE_NAMESPACE,
                          DataBridgeConstants.EVENT_BUFFER_CAPACITY_ELEMENT));
        if (eventBufferCapacity != null) {
            try {
                dataBridgeConfiguration.setEventBufferCapacity(Integer.parseInt(eventBufferCapacity.getText()));
            } catch (NumberFormatException ignored) {

            }
        }
        OMElement clientTimeout = config.getFirstChildWithName(
                new QName(DataBridgeConstants.DATA_BRIDGE_NAMESPACE,
                          DataBridgeConstants.CLIENT_TIMEOUT_ELEMENT));
        if (clientTimeout != null) {
            try {
                dataBridgeConfiguration.setClientTimeOut(Integer.parseInt(clientTimeout.getText()));
            } catch (NumberFormatException ignored) {

            }
        }

    }

    public static void populateConfigurations(DataBridgeConfiguration dataBridgeConfiguration,
                                              List<String[]> streamDefinitions,
                                              OMElement bridgeConfig)
            throws DataBridgeConfigurationException {

        if (bridgeConfig != null) {
            if (!bridgeConfig.getQName().equals(
                    new QName(DataBridgeConstants.DATA_BRIDGE_NAMESPACE, DataBridgeConstants.DATA_BRIDGE_ROOT_ELEMENT))) {
                throw new DataBridgeConfigurationException("Invalid root element in data Bridge server config");
            }
            DataBridgeCoreBuilder.populateStreamDefinitions(bridgeConfig, streamDefinitions);
            DataBridgeCoreBuilder.populateStreamDefinitionStore(bridgeConfig, dataBridgeConfiguration);
        }
    }
}

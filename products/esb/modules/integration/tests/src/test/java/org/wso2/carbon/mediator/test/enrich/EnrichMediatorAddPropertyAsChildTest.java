package org.wso2.carbon.mediator.test.enrich;/*
*Copyright (c) 2005-2010, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
*WSO2 Inc. licenses this file to you under the Apache License,
*Version 2.0 (the "License"); you may not use this file except
*in compliance with the License.
*You may obtain a copy of the License at
*
*http://www.apache.org/licenses/LICENSE-2.0
*
*Unless required by applicable law or agreed to in writing,
*software distributed under the License is distributed on an
*"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
*KIND, either express or implied.  See the License for the
*specific language governing permissions and limitations
*under the License.
*/

import org.apache.axiom.om.OMElement;
import org.apache.axis2.AxisFault;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import org.wso2.carbon.mediator.test.ESBMediatorTest;

import javax.servlet.ServletException;
import javax.xml.namespace.QName;
import javax.xml.stream.XMLStreamException;
import java.io.IOException;
import java.rmi.RemoteException;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertNotNull;

public class EnrichMediatorAddPropertyAsChildTest extends ESBMediatorTest{
    private OMElement response;

    @BeforeTest(alwaysRun = true)
    public void setEnvironmeant()
            throws Exception, RuntimeException, IOException {
        init();
    }

    @BeforeClass(alwaysRun = true)
    public void deployArtifacts() throws Exception, ServletException, RemoteException {

        loadESBConfigurationFromClasspath("/artifacts/ESB/synapseconfig/enrich_mediator/synapse.xml");

    }

    @Test(groups = "wso2.esb", description = "Tests-Adding a defined property as a child of message")
    public void testAddPropertyAsChild() throws AxisFault, XMLStreamException {

        response=axis2Client.sendSimpleStockQuoteRequest(getProxyServiceURL("enrichSample6"),null,
                                                         "IBM");
        assertNotNull(response,"Response is null");
        assertEquals(response.getFirstElement().getFirstChildWithName
                (new QName("http://services.samples/xsd", "symbol")).getText(),
                     "IBM","Tag does not match");
        assertEquals(response.getFirstElement().getFirstChildWithName
                (new QName("http://services.samples/xsd", "test")).getText(),
                     "test","Tag does not match");
    }

    @AfterTest(alwaysRun = true)
    public void stop(){
                   super.cleanup();
    }
}

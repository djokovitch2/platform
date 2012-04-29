function validateServiceDetailsForm(){
    var serviceName = document.getElementById('serviceName').value;
    if(serviceName == ''){
        CARBON.showWarningDialog("Data Service Name is mandatory");
        return false;
    }
    var  reWhiteSpace = new RegExp("^[a-zA-Z0-9_]+$");
    // Check for white space
    if (!reWhiteSpace.test(serviceName)) {
        CARBON.showWarningDialog("Alphanumeric characters and underscores are only allowed in the data service name");
        return false;
    }
    return true;
}

function validateDSGenerator(){
    var serviceName = document.getElementById('txtServiceName').value;
    var multipleMode = document.getElementById("mode");
    if(serviceName == '' && getCheckedValue(multipleMode) == "Single"){
        CARBON.showWarningDialog("Data Service Name is mandatory");
        return false;
    }
    return true;
}

function trim(text) {
    return text.replace(/^\s*/, "").replace(/\s*$/, "");
}


function validateSQLDialectForm(){
	var sqlDialect = document.getElementById('txSQLDialect').value;
	var sql = document.getElementById('txtSQL').value;
	if (sqlDialect == '') {
		  CARBON.showWarningDialog("Specify Supported Driver names");
	      return false;
	}
	if (sql == '' || trim(sql) == '') {
		  CARBON.showWarningDialog("Specify SQL query");
	      return false;
	}
	return true;
}

function validateDatabaseSelection(){
    var datasource = document.getElementById("datasource").options[document.getElementById("datasource").selectedIndex].value;

    if(datasource == '') {
        CARBON.showWarningDialog("Carbon Datasource is mandatory");
        return false;
    }
    var db = document.getElementById('dbName').value;
    if(db == ''){
        CARBON.showWarningDialog("Database Name is mandatory");
        return false;
    }

    return true;
}

function validateTableSelection(obj){
	var tableSet=obj.split(":");
	var index=0;
	while (index < tableSet.length)
	 {
	  if ( document.getElementById(tableSet[index]) != null) {
		  if(document.getElementById(tableSet[index]).checked) {
			  return true;
		  }		  
	  }
	  index+=1;
	 }
   CARBON.showWarningDialog("Atleast one table needs to be selected to proceed");
   return false;
}


function validateDataSourcesForm(){

    return true;
}


function validateAddDataSourceForm(){
    if(document.getElementById('datasourceId').value == ''){
        //CARBON.showErrorDialog("Data Service Name is mandatory");
        CARBON.showWarningDialog('Data Source Id is mandatory');
        return false;
    }
    if(document.getElementById('datasourceType').value == ''){
        CARBON.showWarningDialog('Select the data source type');
        return false;
    }
    if(document.getElementById('datasourceType').value == 'RDBMS'){
        if(document.getElementById('databaseEngine').value == '#'){
            CARBON.showWarningDialog('Select the Database engine');
            return false;
        }
        if(document.getElementById('org.wso2.ws.dataservice.driver').value ==  ''){
            CARBON.showWarningDialog('Database Driver is mandatory');
            return false;
        }
        if(document.getElementById('org.wso2.ws.dataservice.protocol').value ==  ''){
            CARBON.showWarningDialog('JDBC URL is mandatory');
            return false;
        }
        var maxValue = parseInt(document.getElementById('org.wso2.ws.dataservice.maxpoolsize').value);
        var minValue = parseInt(document.getElementById('org.wso2.ws.dataservice.minpoolsize').value);
        if(maxValue <= minValue){
            CARBON.showWarningDialog('Max. Pool Size must be greater than Min. Pool Size');
            return false;
        }
        if(minValue < 0){
            CARBON.showWarningDialog('Max. Pool Size cannot be minus');
            return false;
        }
        if(document.getElementById('org.wso2.ws.dataservice.minpoolsize').value.match(/^[a-zA-Z]+$/)){
            CARBON.showWarningDialog('Enter numeric values to Min. Pool Size');
            return false;
        }
        if(document.getElementById('org.wso2.ws.dataservice.maxpoolsize').value.match(/^[a-zA-Z]+$/)){
            CARBON.showWarningDialog('Enter numeric values to Max. Pool Size');
            return false;
        }
    }else if(document.getElementById('datasourceType').value == 'EXCEL'){
        if(document.getElementById('excel_datasource').value == ''){
            CARBON.showWarningDialog('Excel File Location is mandatory');
            return false;
        }
        //File extension check
        var filePath = document.getElementById('excel_datasource').value;
        var fileExtension = filePath.substring(filePath.lastIndexOf(".") + 1);
        var fileExtensionLower = fileExtension.toLowerCase();
        if (!(fileExtensionLower == 'xls' || fileExtensionLower == 'xlsx')){
        	CARBON.showWarningDialog('Invalid File Type');
        	return false;
        }
    }else if(document.getElementById('datasourceType').value == 'RDF'){
        if(document.getElementById('rdf_datasource').value == ''){
            CARBON.showWarningDialog('RDF File Location is mandatory');
            return false;
        }
    }else if(document.getElementById('datasourceType').value == 'SPARQL'){
        if(document.getElementById('sparql_datasource').value == ''){
            CARBON.showWarningDialog('Sparql Endpoint URI is mandatory');
            return false;
        }
    }else if(document.getElementById('datasourceType').value == 'CSV'){
        if(document.getElementById('csv_datasource').value == ''){
            CARBON.showWarningDialog('CSV File Location is mandatory');
            return false;
        }
        //File extension check
        var filePath = document.getElementById('csv_datasource').value;
        var fileExtension = filePath.substring(filePath.lastIndexOf(".") + 1);
        var fileExtensionLower = fileExtension.toLowerCase();
        if (!(fileExtensionLower == 'csv' || fileExtensionLower == 'txt')){
            CARBON.showWarningDialog('Invalid File Type');
            return false;
        }
        if(document.getElementById('csv_hasheader').value == ''){
            CARBON.showWarningDialog('Contains Column Header Row is mandatory');
            return false;
        }
    }else if(document.getElementById('datasourceType').value == 'JNDIDatasource'){
        if(document.getElementById('jndi_context_class').value == ''){
            CARBON.showWarningDialog('JNDI Context Class is mandatory');
            return false;
        }
        if(document.getElementById('jndi_provider_url').value == ''){
            CARBON.showWarningDialog('Provider URL is mandatory');
            return false;
        }
        if(document.getElementById('jndi_resource_name').value == ''){
            CARBON.showWarningDialog('Resource Name is mandatory');
            return false;
        }
    } else if (document.getElementById('datasourceType').value == 'Cassandra') {
        if(document.getElementById('org.wso2.ws.dataservice.driver').value ==  ''){
            CARBON.showWarningDialog('Database Driver is mandatory');
            return false;
        }
        if(document.getElementById('org.wso2.ws.dataservice.protocol').value ==  ''){
            CARBON.showWarningDialog('JDBC URL is mandatory');
            return false;
        }
    }

    return true;
}

function validateAddQueryForm(obj){
    if(document.getElementById('queryId').value == ''){
        CARBON.showWarningDialog('Query Id is mandatory');
        return false;
    }
    
    var queryId = document.getElementById('queryId').value;
    var reWhiteSpace = new RegExp("^[a-zA-Z0-9_]+$");
    // Validate for alphanumeric characters and underscores
    if (!reWhiteSpace.test(queryId)) {
        CARBON.showWarningDialog("Alphanumeric characters and underscores are only allowed in the Query Id");
        document.getElementById('queryId').readOnly = false;
        return false;
    }
    if(document.getElementById('datasource').value == '#'){
        CARBON.showWarningDialog('Select the data source');
        return false;
    }

    /*if(obj == 'RDBMS'){
     if(document.getElementById('txtExcelWorkbookName').value == ''){
     CARBON.showWarningDialog('Enter value to Workbook Name');
     return false;
     }
     }*/
    
    var dataSourceId = document.getElementById('datasource').value;
    
    if (document.getElementById(dataSourceId).value == 'EXCEL') {
        if (document.getElementById('txtExcelWorkbookName').value == '') {
            CARBON.showWarningDialog('Enter value to Workbook Name');
            return false;
        }
        if (document.getElementById('txtExcelStartingRow').value == '') {
            CARBON.showWarningDialog('Enter value to Start reading from');
            return false;
        }
        if (document.getElementById('txtExcelMaxRowCount').value == '') {
            CARBON.showWarningDialog('Enter value to Rows to read');
            return false;
        }
        if (document.getElementById('txtExcelStartingRow').value.match(/^[a-zA-Z]+$/)) {
            CARBON.showWarningDialog('Enter numeric values to Start reading from');
            return false;
        }
        if (!document.getElementById('txtExcelStartingRow').value.match(/^\s*\d+\s*$/)) {
            CARBON.showWarningDialog('Enter positive numeric value to Start reading from');
            return false;
        }
        if (document.getElementById('txtExcelMaxRowCount').value.match(/^[a-zA-Z]+$/)) {
            CARBON.showWarningDialog('Enter numeric values to Rows to read');
            return false;
        }
    }
     
}

function validateQueryId(obj){
	var queryId = document.getElementById('queryId').value;
       var reWhiteSpace = new RegExp("^[a-zA-Z0-9_]+$");
    // Validate for alphanumeric characters and underscores
    if (!reWhiteSpace.test(queryId)) {
        CARBON.showWarningDialog("Alphanumeric characters and underscores are only allowed in the Query Id");
        return false;
    }
    return true;
    
  }

function validateAddQueryFormSave(obj) {
    if(document.getElementById('queryId').value == ''){
        CARBON.showWarningDialog('Query Id is mandatory');
        return  false;
    }
    if(document.getElementById('datasource').value == '#'){
        CARBON.showWarningDialog('Select the data source');
        return  false;
    }

    if(document.getElementById('RDFRow').style.display == '') {
        if(document.getElementById('sparql').value == '') {
            CARBON.showWarningDialog('Sparql is mandatory');
            return false;
        }
    }

    if(document.getElementById('RDBMSnJNDIRow').style.display == ''){
        if(document.getElementById('sql').value == ''){
        CARBON.showWarningDialog('SQL is mandatory');
        return false;
        }
    }

    if (document.getElementById('CASSANDRARow').style.display == '') {
        if (document.getElementById('cql').value == '') {
            CARBON.showWarningDialog('CQL is mandatory');
            return false;
        }
    }


    if (document.getElementById('timeout').value != null) {
        var timeout = document.getElementById('timeout').value;
        if(isNaN(timeout)){
            CARBON.showWarningDialog("Timeout " + "'" +timeout + "'" + " should be a numeric value");
            return  false;
        }
    }


    if (document.getElementById('fetchSize').value != null) {
        var fetchSize = document.getElementById('fetchSize').value;
        if(isNaN(fetchSize))
        {
            CARBON.showWarningDialog("Fetch size "+ "'" + fetchSize + "'" + " should be a numeric value");
            return  false;
        }
    }

    if(document.getElementById('maxFieldSize').value != null) {
        var maxFieldSize = document.getElementById('maxFieldSize').value;
        if(isNaN(maxFieldSize))
        {
            CARBON.showWarningDialog("Max field size "+ "'" + maxFieldSize + "'" + " should be a numeric value");
            return  false;
        }
    }

    if(document.getElementById('maxRows').value != null) {
        var maxRows = document.getElementById('maxRows').value;
        if(isNaN(maxRows))
        {
            CARBON.showWarningDialog("Max Rows "+ "'" +maxRows + "'" + " should be a numeric value");
            return  false;
        }
    }
    
    if(document.getElementById('noOutputmappings') != null )  {
        if((document.getElementById('outputTypeId').value == 'xml') && (document.getElementById('txtDataServiceWrapElement').value != '' ||  document.getElementById('txtDataServiceRowName').value != '' )){
            CARBON.showWarningDialog('Can not insert result elements without Output Mappings. Insert Output Mappings to proceed.');
            return  false;
        }
        return   true;
    }
    return  true;

}

function validateManageXADSForm(){
	var xaDatasourceId = document.getElementById('xaId').value;
	var txXADatasourceClass = document.getElementById('txXADatasourceClass').value;
	if(xaDatasourceId == ''){
        CARBON.showWarningDialog('XA Data Source Id is mandatory');
        return false;
    }
	if(txXADatasourceClass == ''){
        CARBON.showWarningDialog('XA Data Source Class is mandatory');
        return false;
    }
    return true;
}

function validateAddOperationForm(){
    var operationName = document.getElementById('operationName').value;
    if(document.getElementById('operationName').value == ''){
        CARBON.showWarningDialog('Operation name is mandatory');
        return false;
    }
    if(document.getElementById('queryId').value == ''){
        CARBON.showWarningDialog('Select the query Id');
        return false;
    }
    var  reWhiteSpace = new RegExp("^[a-zA-Z0-9_]+$");
    // Check for white space
    if (!reWhiteSpace.test(operationName)) {
        CARBON.showWarningDialog("Alphanumeric characters and underscores are only allowed in the operation name");
        return false;
    }
    return true;
}

function validateQueriesForm(){
    return true;
}

function validateOperationsForm(){
    return true;
}

function validateResourcesForm(){
    return true;
}

function validateAddResourceForm(){
    var queryId = document.getElementById('queryId');
    if (queryId != null) {
        var query = queryId.value;
    }
    if(document.getElementById('resourcePath').value == ''){
        CARBON.showWarningDialog('Resource Path is mandatory');
        return false;
    }
    if(document.getElementById('resourceMethod').value == ''){
        CARBON.showWarningDialog('Select the Resource Method');
        return false;
    }
    if(query == ''){
        CARBON.showWarningDialog('Select the query Id');
        return false;
    }
    return true;
}

function sendInputPage() {
    var datasourceType = document.getElementById('datasource').value;
    var queryId = document.getElementById('queryId').value;
    var sql = document.getElementById('sql').value;
    location.href = 'addInputMapping.jsp?data_source=' + datasourceType + '&queryId=' + queryId + '&sql_stat=' + sql;
}

function sendSparqlInputPage() {
    var datasourceType = document.getElementById('datasource').value;
    var queryId = document.getElementById('queryId').value;
    var sql = document.getElementById('sql').value;
    location.href = 'addSparqlInputMapping.jsp?data_source=' + datasourceType + '&queryId=' + queryId + '&sql_stat=' + sql;
}
function sendOutputMapping() {
    var datasourceType = document.getElementById('datasource').value;
    var queryId = document.getElementById('queryId').value;
    var sql = document.getElementById('sql').value;
    var element = document.getElementById('txtDataServiceWrapElement').value;
    var rowName = document.getElementById('txtDataServiceRowName').value;
    var outputType = document.getElementById('outputType').value;
    var rdfBaseURI = document.getElementById('txtrdfBaseURI').value;
    var nameSpace = document.getElementById('txtDataServiceRowNamespace').value;

    location.href = 'addOutputMapping.jsp?data_source=' + datasourceType + '&query_id=' + queryId + '&sql_stat=' + sql + '&element=' + element + '&rowName=' + rowName +  '&outputType=' + outputType +  '&rdfBaseURI=' + rdfBaseURI +'&ns=' + nameSpace;
}
function showTables(obj, document) {
    var configId = obj[obj.selectedIndex].value;
    var datasourceType = '';
    if (configId != '#') {
        var datasourceTypeObj = document.getElementById(configId);
        if (datasourceTypeObj != null) {
            datasourceType = datasourceTypeObj.value;
        }
    }
    
    var rdbmsNjndi = 'none';
    var inputMappings = 'none';
    var inputMappingsButton = 'none';
    var sparql = 'none';
    var queryProp = 'none';
    var excel = 'none';
    var gspread = 'none';
    var rdf = 'none';
    var webConfig = 'none';
    var propTable = 'none';
    var inputHeading = 'none';
    var autoResponse = 'none';
    var cassandra = 'none';

    if (datasourceType == 'RDBMS' || datasourceType == 'JNDI' || datasourceType == 'CARBON_DATASOURCE' ) {
        rdbmsNjndi = '';
        inputMappings = '';
        inputMappingsButton = '';
        queryProp = '';
        inputHeading = '';
        autoResponse ='';
    }
    if (datasourceType == 'Cassandra') {
        cassandra = '';
        inputMappings = '';
        inputMappingsButton = '';
        queryProp = '';
        inputHeading = '';
        autoResponse ='';
    }
    if (datasourceType == 'RDF' || datasourceType == 'SPARQL') {
        rdf = '';
        inputMappings = '';
        sparql = '';
        inputHeading = '';
    }
    if (datasourceType == 'EXCEL') {
        excel = '';
    }
    if (datasourceType == 'GDATA_SPREADSHEET') {
        gspread = '';
    }
    if(datasourceType == 'WEB_CONFIG') {
        webConfig = '';
    }

    document.getElementById('RDBMSnJNDIRow').style.display = rdbmsNjndi;
    /*document.getElementById('advancedQueryConfigs').style.display = rdbmsNjndi;*/
    document.getElementById('InputMappingRow').style.display = inputMappings;
    document.getElementById('InputMappingButtonRow').style.display = inputMappingsButton;
    document.getElementById('SparqlInputMappingButtonRow').style.display = sparql;
    document.getElementById('addQueryProperties').style.display = queryProp;
    document.getElementById('ExcelRow').style.display = excel;
    document.getElementById('GSpreadRow').style.display = gspread;
    document.getElementById('RDFRow').style.display = rdf;
    document.getElementById('propertyTable').style.display = propTable;
    document.getElementById('inputHeading').style.display = inputHeading;
    document.getElementById('scraperRow').style.display = webConfig;
    document.getElementById('CASSANDRARow').style.display = cassandra;
    //document.getElementById('autoResponseRow').style.display = autoResponse;
    
}

function setJDBCValues(obj, document) {
    var selectedValue = obj[obj.selectedIndex].value;
    var jdbcUrl = selectedValue.substring(0, selectedValue.indexOf("#"));
    var driverClass = selectedValue.substring(selectedValue.indexOf("#") + 1, selectedValue.length);
    document.getElementById('org.wso2.ws.dataservice.protocol').value = jdbcUrl;
    document.getElementById('org.wso2.ws.dataservice.driver').value = driverClass;
}

function validateOutputMappingFields(obj){
    var grpByElement = document.getElementById('txtDataServiceWrapElement').value;
    var rowElement = document.getElementById('txtDataServiceRowName').value;
    var rowName = document.getElementById('txtDataServiceRowName').value;
    var rdfBaseURI = document.getElementById('txtrdfBaseURI').value;
    var queryId = document.getElementById('queryId').value;
    var datasource = document.getElementById('datasource').value;
    var reWhiteSpace = new RegExp("^[a-zA-Z0-9_]+$");
    // Validate for alphanumeric characters and underscores
    if (!reWhiteSpace.test(queryId)) {
        CARBON.showWarningDialog("Alphanumeric characters and underscores are only allowed in the Query Id");
        return false;
    }
    if((grpByElement == '') && (rdfBaseURI == '')){
        if (grpByElement == ''){
            CARBON.showWarningDialog('Enter value to Grouped by element');
        } else {
            CARBON.showWarningDialog('Enter value to RDF Base URI');
        }
        return false;
    } 
    if(queryId == ''){
        CARBON.showWarningDialog('Query id is required prior adding an output mapping');
        return false;
    }
    if(datasource == '#'){
        CARBON.showWarningDialog('Select the Data Source');
        return false;
    }
    //location.href = 'queryProcessor.jsp?flag=outputMapping&queryId='+document.getElementById('queryId').value+'&sql='+document.getElementById('sql').value+'&datasource='+document.getElementById('datasource').value+'&rowName='+document.getElementById('txtDataServiceRowName').value+'&element='+document.getElementById('txtDataServiceWrapElement').value+'&ns='+document.getElementById('txtDataServiceRowNamespace').value;
    document.getElementById('dataForm').action = 'queryProcessor.jsp?flag=outputMapping&edit='+obj;
    return true;
}

function validateComplexElement(obj){
    //location.href = 'queryProcessor.jsp?flag=outputMapping&queryId='+document.getElementById('queryId').value+'&sql='+document.getElementById('sql').value+'&datasource='+document.getElementById('datasource').value+'&rowName='+document.getElementById('txtDataServiceRowName').value+'&element='+document.getElementById('txtDataServiceWrapElement').value+'&ns='+document.getElementById('txtDataServiceRowNamespace').value;
    if (document.getElementById('txtDataServiceComplexElementName').value == '') {
    	 CARBON.showWarningDialog('Enter Complex Element Name');
         return false;
    }
    document.getElementById('dataForm').action ='OutputMappingProcessor.jsp?flag=complexElement&cmbDataServiceOMType=complexType&queryId=' + document.getElementById('queryId').value+'&txtDataServiceComplexElementName=' + document.getElementById('txtDataServiceComplexElementName').value+'&txtDataServiceComplexElementNamespace=' + document.getElementById('txtDataServiceComplexElementNamespace').value;
    return true;
}

function manageXADataService(obj){
       document.getElementById('dataForm').action ='manageXADS.jsp?flag=manageXADS';
	   return true;
}

function validateInputMappings(){
    var name = document.getElementById('inputMappingNameId').value;
    var sqlType = document.getElementById('inputMappingSqlTypeId').value;
    var ordinal = document.getElementById('inputMappingOrdinalId').value;
    var structType = document.getElementById('structType').value;

    if(name == ''){
        CARBON.showWarningDialog('Enter value to the Mapping Name');
        return false;
    }
    if(sqlType == ''){
        CARBON.showWarningDialog('Select SQL Type');
        return false;
    } else if (sqlType == 'STRUCT' && structType == '') {
        CARBON.showWarningDialog('Enter name of the SQL struct type');
        return false;
    }
    if(ordinal.match(/^[a-zA-Z]+$/)){
        CARBON.showWarningDialog('Enter numeric values to Ordinal');
        return false;
    }
    // }
    return true;
}

function validateAddEvent(){
    var name = document.getElementById('name').value;
    var expression = document.getElementById('expression').value;
    var targetTopic = document.getElementById('targetTopic').value;

    if(name == ''){
        CARBON.showWarningDialog('Enter Event ID');
        return false;
    }
    if (name.length > 100) {
    	  CARBON.showWarningDialog('Event Id should be a valid ID');
          return false;
    }
    if(expression == ''){
        CARBON.showWarningDialog('Enter Expression');
        return false;
    }
    if(targetTopic == ''){
        CARBON.showWarningDialog('Enter Target Topic');
        return false;
    }
    
    return true;
}

function validateSparqlInputMappings(){
    var name = document.getElementById('inputMappingNameId').value;
    var sqlType = document.getElementById('inputMappingSqlTypeId').value;

    if(name == ''){
        CARBON.showWarningDialog('Enter value to the Mapping Name');
        return false;
    }
    if(sqlType == ''){
        CARBON.showWarningDialog('Select XSD Type');
        return false;
    }
    return true;
}

function changeFileType(obj, document) {
    var fileType = obj.value;
    if(fileType == 'file') {
        document.getElementById('fileRow').style.display = '';
        document.getElementById('urlRow').style.display = 'none';
    } else {
        document.getElementById('fileRow').style.display = 'none';
        document.getElementById('urlRow').style.display = '';
    }

}

function validatRDFeOutputMappingMandatoryFields(){
    if(document.getElementById('cmbDataServiceOMType').value != ''){
        if(document.getElementById('cmbDataServiceOMType').value == 'resource'){
            if((document.getElementById('txtDataServiceResourceName').value == '')){
                CARBON.showWarningDialog('Resource mapping field is required prior adding an output mapping');
                return false;
            }
            if((document.getElementById('txtrdfRefURI').value == '')){
                CARBON.showWarningDialog('Resource URI is required prior adding an output mapping');
                return false;
            }
        } else if (document.getElementById('cmbDataServiceOMType').value == 'complexType') {
        	if((document.getElementById('txtDataServiceComplexElementName').value == '')){
                CARBON.showWarningDialog('Complex Type Element Name field is required prior adding an output mapping');
                return false;
            }
        	
        } else {
        	var outputField = document.getElementById('txtDataServiceOMElementName').value;
            if(outputField == ''){
                CARBON.showWarningDialog('Output field name is required prior adding an output mapping!!');
                return false;
            } 
            if (!isNaN(outputField)) {
           	 	CARBON.showWarningDialog('Output field name cannot be numeric');
           	 	return false;
            }	
           
        }
        return true;
    }
    else{
        CARBON.showWarningDialog('Mapping Type is required.');
        return false;
    }
    return true;
}

function validateOutputMappingMandatoryFields(){
    if(document.getElementById('cmbDataServiceOMType').value != ''){
        if(document.getElementById('cmbDataServiceOMType').value == 'query'){
        	if(document.getElementById('cmbDataServiceQueryId').value == ''){
                CARBON.showWarningDialog('Please select the Query to proceed');
                return false;
            }
        } else if (document.getElementById('cmbDataServiceOMType').value == 'complexType') {
        	if((document.getElementById('txtDataServiceComplexElementName').value == '')){
                CARBON.showWarningDialog('Complex Type Element Name field is required prior adding an output mapping');
                return false;
            }
        	
        } else {
            var outputField = document.getElementById('txtDataServiceOMElementName').value;
            if(outputField == ''){
                CARBON.showWarningDialog('Output field name is required prior adding an output mapping');
                return false;
            }
            
            if (!isNaN(outputField)) {
           	 	CARBON.showWarningDialog('Output field name cannot be numeric');
           	 	return false;
            }	
            if(document.getElementById('datasourceValue').value == ''){
            	CARBON.showWarningDialog('SQL column Name is required prior adding an output mapping');
                return false;
            } 
        }
        return true;
    }else{
        CARBON.showWarningDialog('Mapping Type is required.');
        return false;
    }
    return true;
}

function validateInputMappingButton(){
    var queryId = document.getElementById('queryId').value;
    var sql = document.getElementById('sql').value;
    if(queryId == ''){
        CARBON.showWarningDialog('Query id is required prior adding an input mapping');
        return false;
    }
    if(sql == ''){
        CARBON.showWarningDialog('Enter value to SQL');
        return false;
    }
    //location.href = 'queryProcessor.jsp?flag=inputMapping&queryId='+document.getElementById('queryId').value+'&sql='+document.getElementById('sql').value+'&datasource='+document.getElementById('datasource').value;
    return false;
}



function changeToDataSourceType(obj, document){
    var selectedValue = obj[obj.selectedIndex].value;
    if(selectedValue == 'query-param'){
        document.getElementById('queryParamnRow').style.display = '';
        document.getElementById('columnRow').style.display = 'none';
    }
    else{
        document.getElementById('queryParamnRow').style.display = 'none';
        document.getElementById('columnRow').style.display = '';
    }
}


function changeToNextRDFMapping(obj, document){
    var selectedValue = obj[obj.selectedIndex].value;
    if(selectedValue == 'resource'){
        document.getElementById('resourceRow').style.display = '';
        document.getElementById('omElementRowId').style.display = 'none';
    }
    else {
        document.getElementById('resourceRow').style.display = 'none';
        document.getElementById('omElementRowId').style.display = '';
    }
}

function changeToNextMapping(obj, document){
    var selectedValue = obj[obj.selectedIndex].value;
    if(selectedValue == 'query'){
        document.getElementById('queryRow').style.display = '';
        document.getElementById('omElementRowId').style.display = 'none';
        document.getElementById('complexTypeRowId').style.display = 'none';
    }
    else if(selectedValue == 'complexType'){
    	document.getElementById('complexTypeRowId').style.display = '';
        document.getElementById('queryRow').style.display = 'none';
        document.getElementById('omElementRowId').style.display = 'none';

    } else if(selectedValue == 'element') {
        document.getElementById('queryRow').style.display = 'none';
        document.getElementById('omElementRowId').style.display = '';
        document.getElementById('elementNameSpaceRow').style.display = '';
        document.getElementById('complexTypeRowId').style.display = 'none';

    } else if(selectedValue == 'attribute') {
	   	 document.getElementById('queryRow').style.display = 'none';
	     document.getElementById('omElementRowId').style.display = '';
	     document.getElementById('complexTypeRowId').style.display = 'none';
	     document.getElementById('elementNameSpaceRow').style.display = 'none';
    }
}

function onEnableXAChange(document){
	var useAppServerBtn = document.getElementById("enableDT");
    if (getCheckedValue(useAppServerBtn) == "") {
    	document.getElementById('txManager').style.display = 'none';
    } else {
    	document.getElementById('txManager').style.display = '';
    }
}

function onModeChange(document){
	var multipleMode = document.getElementById("mode");
    if (getCheckedValue(multipleMode) == "Single") {    	
    	document.getElementById('txServiceNameRow').style.display = '';
    } else {
    	document.getElementById('txServiceNameRow').style.display = 'none';
    }
}

function getCheckedValue(radioObj) {
	if (!radioObj) {
		return "";
	}
	var radioLength = radioObj.length;
	if (radioLength == undefined) {
		if(radioObj.checked) {
			return radioObj.value;
		} else {
			return "";
		}
	}
	for (var i = 0; i < radioLength; i++) {
		if (radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}


function onUseAppServerChange(document) {
	var useAppServerBtn = document.getElementById("useAppServerTS");
    if (getCheckedValue(useAppServerBtn) == "true") {    	
    	document.getElementById('txManagerNameRow').style.display = '';
    } else {
    	document.getElementById('txManagerNameRow').style.display = 'none';
    }
}

function sendToInputMapping(obj){
    document.getElementById('dataForm').URL = 'queryProcessor.jsp?flag=inputMapping';
    return false;
}

function sendToSparqlInputMapping(obj){
    document.getElementById('dataForm').URL = 'queryProcessor.jsp?flag=sparqlInputMapping';
    return false;
}

function getCSVHeaderValues(obj){
    var configId = document.getElementById('datasourceId').value;
    location.href = 'setHeader_ajaxprocessor.jsp?configId='+configId;
}

function setCSVColumnSelection(){
    var csvColumns = document.getElementById('csvColumnSelection');
    if (csvSelectedColumnOrder == csvColumns.options.length) {
        var message = "You have aleady selected all columns.This will reset all column selections done so far. Do you want to continue?";
        if (confirm(message)) {
            csvSelectedColumnOrder = 0;
            getCSVHeaderColumnNames(document);
        }
    }

    for (i = 0; i < csvColumns.options.length; i++) {
        if (csvColumns.options[i].selected) {
            if (csvColumns.options[i].text.indexOf('as column no') == -1) {
                csvSelectedColumnOrder++;
                if (csvSelectedColumnOrder > 1) {
                    document.getElementById('csv_columns').value =
                    document.getElementById('csv_columns').value + ',' + csvColumns.options[i].text;
                    document.getElementById('csv_columnordinal').value =
                    document.getElementById('csv_columnordinal').value + ',' +
                    csvSelectedColumnOrder;
                } else {
                    document.getElementById('csv_columns').value = csvColumns.options[i].text;
                    document.getElementById('csv_columnordinal').value = csvSelectedColumnOrder;
                }
                csvColumns.options[i].text =
                csvColumns.options[i].text + " as column no : " + csvSelectedColumnOrder;
                csvColumns.options[i].value =
                csvColumns.options[i].value + ":" + csvSelectedColumnOrder;
            }
        }
    }
}

function incrementCount(count) {
    count = count+1;
     document.getElementById('propertyCount').value =count;

}
function deleteDatasource(obj) {
    function forwardToDel() {
        var url = 'dataSourceProcessor.jsp?datasourceId=' + obj + '&flag=delete';
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete the datasource ' + obj + ' ?', forwardToDel);
}

function deleteXADatasource(obj) {
    function forwardToDel() {
        var url = 'xaDataSourceProcessor.jsp?xaId=' + obj + '&action=delete';
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete the XA datasource ' + obj + ' ?', forwardToDel);

}

function deleteXADSProperty(obj,xaId) {
    function forwardToDel() {
        var url = 'xaDataSourceProcessor.jsp?txPropertyName=' + obj + '&xaId='+xaId+'&action=deleteAddProp';
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete the XA datasource property ' + obj + ' ?', forwardToDel);

}

function deleteQuery(obj){
    function forwardToDel() {
        var url = 'queryProcessor.jsp?queryId='+obj+'&flag=delete';
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete '+obj+' query?', forwardToDel);

}

function deleteResources(obj){
    function forwardToDel() {
        var url = 'resourceProcessor.jsp?action=remove&oldResourcePath='+obj;
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete resource '+obj+'?', forwardToDel);

}

function deleteOperations(obj){
    function forwardToDel() {
        var url = 'operationProcessor.jsp?action=remove&operationName='+obj;
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete operation '+obj+'?', forwardToDel);
}

function deleteInputMappings(objName,objSqlType,queryId, type){
    function forwardToDel(){
        var url = 'inputMappingProcessor.jsp?inputMappingId='+objName+'&inputMappingSqlType='+objSqlType+'&queryId='+queryId+'&flag=delete'+type+'&origin=add';
        document.location.href = url;

    }
    CARBON.showConfirmationDialog('Do you want to delete the input mapping '+objName+'?', forwardToDel);
}

function deleteSparqlInputMappings(objName,objSqlType,queryId){
    function forwardToDel(){
        var url = 'inputMappingProcessor.jsp?inputMappingId='+objName+'&inputMappingSqlTypeId='+objSqlType+'&queryId='+queryId+'&flag=delete&origin=add';
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete the input mapping '+objName+"type"+objSqlType+'?', forwardToDel);
}


function deleteInputMappingsFromAddQuery(objName,objSqlType,queryId,type){
    function forwardToDel(){
        var url = 'inputMappingProcessor.jsp?inputMappingId='+objName+'&inputMappingSqlType='+objSqlType+'&queryId='+queryId+'&flag=delete'+type+'&origin=save';
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete the input mapping '+objName+'?', forwardToDel);
}

function deleteSQLDialectAddQuery(queryId,dialect){
    function forwardToDel(){
        var url = 'sqlDialectProcessor.jsp?queryId='+queryId+'&flag=delete&txSQLDialect='+dialect;
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete the sql dialect '+dialect+'?', forwardToDel);
}

function deleteSparqlInputMappingsFromAddQuery(objName,objSqlType,queryId){
    function forwardToDel(){
        var url = 'sparqlInputMappingProcessor.jsp?inputMappingId='+objName+'&inputMappingSqlTypeId='+objSqlType+'&queryId='+queryId+'&flag=delete&origin=save';
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete the input mapping '+objName+'?', forwardToDel);
}

function deleteOutputMappings(queryId,name,mappingType){
    function forwardToDel(){
        if(mappingType == 'element'){
            var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&edit=delete&cmbDataServiceOMType=element&flag=add&txtDataServiceOMElementName='+name;
        }
        if(mappingType == 'attribute'){
            var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&edit=delete&cmbDataServiceOMType=attribute&txtDataServiceOMElementName='+name+'&flag=add';
        }
        if(mappingType == 'query'){
            var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&cmbDataServiceQueryId='+name+'&edit=delete&cmbDataServiceOMType=query&href='+name+'&flag=add';
        }
        if(mappingType == 'complexType'){
        	 var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&edit=delete&cmbDataServiceOMType=complexType&flag=add&txtDataServiceComplexElementName='+name;
        }
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete the output mapping '+name+'?', forwardToDel);
}

function deleteComplexOutputMappings(queryId,complexPath,name,mappingType){
    function forwardToDel(){
        if(mappingType == 'element'){
            var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&edit=delete&cmbDataServiceOMType=element&complexPath='+complexPath+'&flag=add&txtDataServiceOMElementName='+name;
        }
        if(mappingType == 'attribute'){
            var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&edit=delete&cmbDataServiceOMType=attribute&complexPath='+complexPath+'&txtDataServiceOMElementName='+name+'&flag=add';
        }
        if(mappingType == 'query'){
            var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&cmbDataServiceQueryId='+name+'&edit=delete&cmbDataServiceOMType=query&complexPath='+complexPath+'&href='+name+'&flag=add';
        }
        if(mappingType == 'complexType'){
        	 var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&edit=delete&cmbDataServiceOMType=complexType&complexPath='+complexPath+'&flag=add&txtDataServiceComplexElementName='+name;
        }
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete the output mapping '+name+'?', forwardToDel);
}

function deleteRDFOutputMappings(queryId,name,mappingType){
    function forwardToDel(){
        if(mappingType == 'element'){
            var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&edit=delete&cmbDataServiceOMType=element&flag=addrdf&txtDataServiceOMElementName='+name;
        }
        if(mappingType == 'resource'){
            var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&edit=delete&cmbDataServiceOMType=resource&flag=addrdf&txtDataServiceResourceName='+name;
        }
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete the output mapping '+name+'?', forwardToDel);
}

function deleteOutputMappingsFromAddQuery(queryId,name,mappingType){
    function forwardToDel(){
        if(mappingType == 'element'){
            var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&edit=delete&cmbDataServiceOMType=element&txtDataServiceOMElementName='+name+'&flag=save';
        }
        if(mappingType == 'resource'){
            var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&edit=delete&cmbDataServiceOMType=resource&txtDataServiceResourceName='+name+'&flag=save';
        }
        if(mappingType == 'attribute'){
            var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&edit=delete&cmbDataServiceOMType=attribute&txtDataServiceOMElementName='+name+'&flag=save';
        }
        if(mappingType == 'query'){
            var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&cmbDataServiceQueryId='+name+'&edit=delete&cmbDataServiceOMType=query&href='+name+'&flag=save';
        }
        if(mappingType == 'complexType'){
            var url = 'OutputMappingProcessor.jsp?queryId='+queryId+'&edit=delete&cmbDataServiceOMType=complexType&txtDataServiceComplexElementName='+name+'&flag=save';
        }
        document.location.href = url;
    }
    CARBON.showConfirmationDialog('Do you want to delete the output mapping '+name+'?', forwardToDel);
}

function redirectToMainConfiguration(obj){
    function forwardToDel(){
        var url = 'addQuery.jsp?queryId='+obj+'&ordinal=3';
        document.location.href = url;
    }
    if(!validateReturnToMainConfiguration(document)) {
       CARBON.showConfirmationDialog('Do you want to go back to the main configuration?',forwardToDel);
    } else {
       forwardToDel();
    }

}

function gspreadVisibiltyOnChange(obj, document) {
    var selectedValue = obj[obj.selectedIndex].value;
    dval = null;
    if (selectedValue == "private") {
        dval = "table-row";
    } else {
        dval = "none";
    }
    document.getElementById('tr:gspread_username').style.display = dval;
    document.getElementById('tr:gspread_password').style.display = dval;
}

function defaultValueVisibilityOnChange(obj, document) {
    var selectedValue = obj[obj.selectedIndex].value;
    var visibile = null;
    if(selectedValue == 'ARRAY'){
        visibile = 'none';
    }else{
        visibile = '';
    }
    document.getElementById('defaultValueRow').style.display = visibile;
}

function arrayNameVisibilityOnChange(obj, document) {
    var selectedValue = obj[obj.selectedIndex].value;
    var visible = null;
    if(selectedValue == 'ARRAY'){
        visible = '';
    }else{
        visible = 'none';
    }
    document.getElementById('arrayNameRow').style.display = visible;
    document.getElementById('arrayNameRow1').style.display = visible;
}

function changeDataSourceType (obj, document) {
	var selectedType =  obj[obj.selectedIndex].value;
	var selectedDS = document.getElementById('datasourceId').value;
	if (selectedDS == ''){
        CARBON.showWarningDialog('Insert datasource id');
        obj.selectedIndex = 0;
        return false;
	} else {
		location.href = 'addDataSource.jsp?selectedType='+selectedType+'&configId='+selectedDS+'&ds=edit';
	}	
	
		
}

function changeXADataSourceEngine (obj, document) {
 	var selectedType =  obj[obj.selectedIndex].value;
 	var driverClass = selectedType.substring(0, selectedType.indexOf("#"));
    var url = selectedType.substring(selectedType.indexOf("#") + 1, selectedType.length);
 	document.getElementById('org.wso2.ws.dataservice.xa_datasource_class').value = driverClass;
    document.getElementById('URL').value = url;
 }

function changeXAType(obj, document) {
	var selectedDS = document.getElementById('datasourceId').value;
    var selectedVal = obj.value;
    var xaVal = false;
    if (selectedVal == 'xaType') {
    	xaVal = true;
    }
   location.href = 'addDataSource.jsp?selectedType=RDBMS&configId='+selectedDS+'&xaVal='+xaVal+'&flag=edit';
}

function outputTypeVisibilityOnChange(obj, document) {
    var selectedValue = obj[obj.selectedIndex].value;
    var visibile = null;
    if(selectedValue == 'rdf'){
        document.getElementById('xmlResultTypeRow').style.display = 'none';
        document.getElementById('rdfResultTypeRow').style.display = '';
    }else{
        document.getElementById('xmlResultTypeRow').style.display = '';
        document.getElementById('rdfResultTypeRow').style.display = 'none';
    }
}


function inOutVisibilityOnChange(obj, document) {
    var selectedValue = obj[obj.selectedIndex].value;
    if(selectedValue == 'OUT'){
        //document.getElementById('validatorRow').style.display = 'none';
    }else{
       //document.getElementById('validatorRow').style.display = '';
    }
}

function changeAddValidatorFields(obj,document) {
    var selectValue = obj[obj.selectedIndex].value;
    var visibleRangeVal = null;
    var visiblePattern = null;
    var visibleCustom = null;

    if(selectValue != null){
        document.getElementById('validators').style.display = '';
        if(selectValue != 'validatePattern' || selectValue != 'validateCustom') {
            visibleRangeVal = '';
            visibleCustom = 'none';
            visiblePattern = 'none';
        }
        if(selectValue == 'validatePattern') {
            visibleRangeVal = 'none';
            visibleCustom = 'none';
            visiblePattern = '';
        }
        if(selectValue == 'validateCustom'){
            visibleCustom = '';
            visiblePattern = 'none';
            visibleRangeVal = 'none';
        }
        if(selectValue == "#") {
        	visibleRangeVal = 'none';
            visibleCustom = 'none';
            visiblePattern = 'none';
        }
    }
    document.getElementById('maxRangeValidatorElementsRow').style.display = visibleRangeVal;
    document.getElementById('minRangeValidatorElementsRow').style.display = visibleRangeVal;
    document.getElementById('patternValidatorElementsRow').style.display = visiblePattern;
    document.getElementById('customValidatorElementsRow').style.display = visibleCustom;
    document.getElementById('addValidator').style.display = '';
}

        var rows = 0;
        var itr = 0;
        //add a new row to the table
        function addRow(rowCount, flag) {
            if (rowCount != 0 && flag == 'edit' && itr == 0) {
                rows = rowCount ;
                itr++;
            }
            rows++;

            //add a row to the rows collection and get a reference to the newly added row
            var newRow = document.getElementById("serviceTbl").insertRow(-1);
            newRow.id = 'subscription' + rows;

            var oCell = newRow.insertCell(-1);
            oCell.innerHTML = "<input type='text' style='margin-left: -7px;' name='subscription"+ rows +"' size='30'/>&nbsp;&nbsp;<input type='button' style='margin-left: -6px;' value='  -  ' onclick=\"deleteRow('subscription"+ rows +"');\" />";
            oCell.className = "normal";
            alternateTableRows('serviceTbl', '', '');
            
            return true;
        }

        function deleteRow(rowId) {
            var tableRow = document.getElementById(rowId);
            tableRow.parentNode.deleteRow(tableRow.rowIndex);
            alternateTableRows('serviceTbl', '', '');

            return true;
        }

function deleteEvent(eventId, queryId) {
    function forwardToDel(){
        var url = 'eventProcessor.jsp?queryId='+queryId+'&id='+eventId+'&flag=delete';
        document.location.href = url;

    }
   CARBON.showConfirmationDialog('Do you want to delete the input mapping '+eventId+'?', forwardToDel);
}

function showSQLDialects() {
    var dialectTab = document.getElementById('SQLDialectTable');
    var sqlDialectSymbolMax =  document.getElementById('sqlDialectSymbolMax');
    if(dialectTab.style.display == 'none') {
        dialectTab.style.display = '';
        sqlDialectSymbolMax.setAttribute('style','background-image:url(images/minus.gif);');
    } else {
        dialectTab.style.display = 'none';
        sqlDialectSymbolMax.setAttribute('style','background-image:url(images/plus.gif);');
    }
}

function showQueryProperties() {
    var propertyTab = document.getElementById('propertyTable');
    var propertySymbolMax =  document.getElementById('propertySymbolMax');
    if(propertyTab.style.display == 'none') {
        propertyTab.style.display = '';
        propertySymbolMax.setAttribute('style','background-image:url(images/minus.gif);');
    } else {
        propertyTab.style.display = 'none';
        propertySymbolMax.setAttribute('style','background-image:url(images/plus.gif);');
    }
}

function showPasswordManager() {
  var pwdMngrSymbolMax =  document.getElementById('pwdMngrSymbolMax');
  var passwordManagerFields = document.getElementById('passwordManagerFields');
  if(passwordManagerFields.style.display == 'none') {
    pwdMngrSymbolMax.setAttribute('style','background-image:url(images/minus.gif);');
    passwordManagerFields.style.display = '';  
  } else {
      pwdMngrSymbolMax.setAttribute('style','background-image:url(images/plus.gif);');
      passwordManagerFields.style.display = 'none';
  }

  
}

function showExportOption() {
	  var exportTableTab = document.getElementById('exportTable');
	  var exportSymbolMin =  document.getElementById('exportSymbolMin');
	  var exportSymbolMax =  document.getElementById('exportSymbolMax');
	  if(exportTableTab.style.display == 'none') {
	    exportTableTab.style.display = '';
	    exportSymbolMin.style.display='';
	    exportSymbolMax.style.display='none';
	  } else {
	    exportTableTab.style.display = 'none';
	    exportSymbolMin.style.display='none';
	    exportSymbolMax.style.display='';
	  }
}
	  
	
function validateValidators(obj, document) {
    var max = document.getElementById('max').value;
    var min = document.getElementById('min').value;
    var pattern = document.getElementById('pattern').value;
    var customClass = document.getElementById('customClass').value;
    var validator = document.getElementById('validatorList')[document.getElementById('validatorList').selectedIndex].value;

    if(validator == 'validateLongRange' || validator == 'validateDoubleRange' || validator == 'validateLength') {
        if(isNaN(max)){
            CARBON.showWarningDialog("Maximum Value " + "'" +max + "'" + " should be a numeric value");
            return false;
        } else if(isNaN(min)){
            CARBON.showWarningDialog("Minimum Value " + "'" +min + "'" + " should be a numeric value");
            return false;
        } else if(( validator == 'validateLongRange' || validator == 'validateLength') && (parseInt(max) < parseInt(min))) {
            CARBON.showWarningDialog("Maximum Value is less than Minimum Value");
            return false;
        } else if (validator == 'validateDoubleRange' && (parseFloat(max) < parseFloat(min))) {
            CARBON.showWarningDialog("Maximum Value is less than Minimum Value");
            return false;
        } else if (max == '') {
            CARBON.showWarningDialog("Maximum Value is mandatory");
            return false;
        } else if (min == '') {
            CARBON.showWarningDialog("Minimum Value is mandatory");
            return false;
        }
        
    } else if (validator == 'validatePattern'){
        if (pattern == '') {
            CARBON.showWarningDialog("Pattern is mandatory");
            return false;
        }
    } else if (validator == 'validateCustom') {
        if(customClass == '') {
            CARBON.showWarningDialog("Class Name is mandatory");
            return false;
        }    
    }    
     return true;
}

function changeWebHarvestConfig(obj, document) {
    var configType = obj.value;
    if(configType == 'file') {
        document.getElementById('web_harvest_config').style.display = '';
        document.getElementById('config_reg').style.display = '';
        document.getElementById('gov_reg').style.display = '';
        document.getElementById('web_harvest_config_textArea').style.display = 'none';
    } else {
        document.getElementById('web_harvest_config').style.display = 'none';
        document.getElementById('config_reg').style.display = 'none';
        document.getElementById('gov_reg').style.display = 'none';
        document.getElementById('web_harvest_config_textArea').style.display = '';
    }
}

/*
This method takes the all 'input' elements in a document and if the element type is 'text'
it check whether that text field is empty or not. If document contains at least one text field with
some text value  method will return false. If all text fields in document is empty it returns true.

This method is used in redirectToMainConfiguration() method. Using this method it checks whether
text fields in current page is empty or not. If all fields are  empty directly goto main configuration
page.If text fields contains some value pop up a confirmation message before leaving the current page.
 */
function validateReturnToMainConfiguration(document) {
    var inputs = document.getElementsByTagName("input");
    var countNotEmptyFields = 0;

    for (var i = 1; i < inputs.length; i++) {
        if (inputs[i].getAttribute('type') == 'text') {
            if(document.getElementById(inputs[i].getAttribute('id')).value != ''){
               countNotEmptyFields = countNotEmptyFields + 1;
                break;
            }
        }
    }

    if (countNotEmptyFields > 0) {
        return false;
    } else {
        return true;
    }
}


function addXAPropertyFields(obj,propertyCount) {
    var propVal = parseInt(propertyCount);
    document.getElementById('propertyCount').value=  propVal+1;
    var table = document.getElementById('mainTable');

    var propertyNameRaw = document.createElement("tr");
    var propertyValueRaw = document.createElement("tr");
    propertyNameRaw.setAttribute("id", "propertyNameRaw" + propertyCount);
    //propertyValueRaw.setAttribute("id", "propertyValueRaw" + propertyCount);

    var td1 = document.createElement("TD");
    var label = document.createElement('label');
    var labelText = document.createTextNode('Property Name');
    label.appendChild(labelText);


    var td2 = document.createElement("TD");
    var el = document.createElement('input');
    el.type = 'text';
    el.name = 'propertyNameRaw'+propertyCount;
    el.id = 'propertyNameRaw'+propertyCount;
    el.size = 30;

    td1.appendChild(label);
    td2.appendChild(el);

    propertyNameRaw.appendChild(td1);
    propertyNameRaw.appendChild(td2);

    var td3 = document.createElement("TD");
    var valueLabel = document.createElement('label');
    var valueLabelText = document.createTextNode('Property Value');
    valueLabel.appendChild(valueLabelText);


    var td4 = document.createElement("TD");
    var valueEl = document.createElement('input');
    valueEl.type = 'text';
    valueEl.name = 'propertyValueRaw'+propertyCount;
    valueEl.id = 'propertyValueRaw'+propertyCount;
    valueEl.size = 30;

    var deleteTD = document.createElement("td");
    deleteTD.innerHTML = "<a href='#' class='delete-icon-link' onclick='deleteNewPropertyField(" +
            propertyCount + ");return false;'>Delete</a>";

    td3.appendChild(valueLabel);
    td4.appendChild(valueEl);

    propertyNameRaw.appendChild(td3);
    propertyNameRaw.appendChild(td4);
    propertyNameRaw.appendChild(deleteTD);

    document.getElementById("mainTable").getElementsByTagName('tbody')[0].appendChild(propertyNameRaw);
    return true;
}

function showAdvancedRDBMSConfigurations() {
  var pwdMngrSymbolMax =  document.getElementById('pwdMngrSymbolMax');
  var advancedConfigFields = document.getElementById('advancedConfigFields');
  if(advancedConfigFields.style.display == 'none') {
    pwdMngrSymbolMax.setAttribute('style','background-image:url(images/minus.gif);');
    advancedConfigFields.style.display = '';
  } else {
      pwdMngrSymbolMax.setAttribute('style','background-image:url(images/plus.gif);');
      advancedConfigFields.style.display = 'none';
  }
}

function deleteNewPropertyField(i) {
    var propertyNameRaw = document.getElementById("propertyNameRaw" + i);
    if (propertyNameRaw != undefined && propertyNameRaw != null) {
        var parentTBody = propertyNameRaw.parentNode;
        if (parentTBody != undefined && parentTBody != null) {
            parentTBody.removeChild(propertyNameRaw);
        }
    }
}

function setSQLDialectDriverPrefix()
{
  var txtSelectedValuesObj = document.getElementById('txSQLDialect');
  var selectedArray = new Array();
  var selObj = document.getElementById('sqlDialectId');
  var i;
  var count = 0;
  for (i=0; i<selObj.options.length; i++) {
    if (selObj.options[i].selected) {
      selectedArray[count] = selObj.options[i].value;
      count++;
    }
  }
  txtSelectedValuesObj.value = selectedArray;
}

function deleteOperationParameters(name, operationName, oldOperationName, queryId, operationDesc, enableStreaming , action){
    function forwardToDel(){
        document.location.href = 'operationProcessor.jsp?flag=delete&paramName=' + name + '&action=' +action + '&operationName='+operationName +'&oldOperationName='+ oldOperationName + '&queryId='+ queryId + '&operationDesc='+operationDesc + '&enableStreaming='+enableStreaming;
    }
    CARBON.showConfirmationDialog('Do you want to delete the operation parameter '+name+'?', forwardToDel);
}

function validateOperationParamForm(){
	var paramName = document.getElementById('paramNameId').value;
	var operationParamName = document.getElementById('operationParamNameId').value;
	if (paramName == '') {
		  CARBON.showWarningDialog("Specify Param Name");
	      return false;
	}
	if (operationParamName == '' || trim(operationParamName) == '') {
		  CARBON.showWarningDialog("Specify Operation Param Name");
	      return false;
	}
	return true;
}

function changeVisiblityOnTypeSelection(obj, document) {
    var selectedSqlType = obj[obj.selectedIndex].value;
    if (selectedSqlType == 'STRUCT' || selectedSqlType == 'ARRAY') {
        document.getElementById('defaultValueRow').style.display = 'none';
        document.getElementById('structTypeRow').style.display = ''
    } else {
        document.getElementById('defaultValueRow').style.display = '';
        document.getElementById('structTypeRow').style.display = 'none'
    }
}


















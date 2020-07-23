<%@ include file="/WEB-INF/template/include.jsp"%>

<%@ include file="/WEB-INF/template/header.jsp"%>

<h2>
  <spring:message code="laboratory.title" />
</h2>

<div id="searchinLabratory">
  <b class="boxHeader"> </b>
  <div class="box">
    <form>
      <table class="openmrsSearchTable" cellpadding="2" cellspacing="0" style="width: 100%">

        <tbody id="objHitsTableBody" style="vertical-align: top">
          <tr>
            <td>Person Name</td>
            <td>
              <input type="text" name="personname" id="personname" size="40" />
            </td>
          </tr>
          <tr>
            <td>Test Type</td>
            <td>
              <input type="text" name="testype" id="testype" size="40" />
            </td>
          </tr>
          <tr>
            <td>Test ID</td>
            <td>
              <input type="text" name="testid" id="testid" size="40" />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <button type="button" name="runsearch" id="runsearch"> Search </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <div class="dataTables_wrapper" id="openmrsSearchTable_wrapper">
      <table id="openmrsSearchTable" style="width: 100%" cellspacing="0" cellpadding="2">
        <thead id="searchTableHeader">
          <tr>
            <th><span></span>Identifier</th>
            <th><span></span>Given</th>
            <th><span></span>Middle</th>
            <th><span></span>Family Name</th>
            <th><span></span>Age</th>
            <th><span></span>Gender</th>
            <th><span></span>Test Date</th>
            <th><span></span>Test Result</th>
          </tr>
        </thead>
        <tbody>
          <tr class="odd">
            <td colspan="8" class="dataTables_empty" valign="top">No matching records found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<%@ include file="/WEB-INF/template/footer.jsp"%>
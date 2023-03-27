


        function callUnitTestLogsByWebservice_LoadData_OnSuccess(callUnitTestLogData)
        {
            let tableBody1 = $("#tableBody");

            callUnitTestLogData.forEach(function (row)
            {
                let newRow = $("<tr>");
                newRow.append($("<td>").text(row.nameSpace));
                newRow.append($("<td>").text(row.className));
                newRow.append($("<td>").text(row.methodName));
                newRow.append($("<td>").text(row.assertMethodName));
                let status = (row.testStatus === 1) ? "Passed" : "Failed";
                newRow.append($("<td>").text(status));
                tableBody1.append(newRow);
            });

            //var xmlString = new XMLSerializer().serializeToString(callUnitTestLogData);
            //alert(xmlString);
        }


        function callUnitTestLogsByWebApi_LoadData_OnSuccess(callUnitTestLogData)
        {

            alert("callUnitTestLogsByWebApi");

/*
            let tableBody2 = $("#tableBody");

            callUnitTestLogData.forEach(function (row)
            {
                let newRow2 = $("<tr>");
                newRow2.append($("<td>").text(row.nameSpace));
                newRow2.append($("<td>").text(row.className));
                newRow2.append($("<td>").text(row.methodName));
                newRow2.append($("<td>").text(row.assertMethodName));
                let status = (row.testStatus === 1) ? "Passed" : "Failed";
                newRow2.append($("<td>").text(status));
                tableBody2.append(newRow2);
            });
*/
           var xmlString = new XMLSerializer().serializeToString(callUnitTestLogData);
            alert(xmlString);
        }


        export function callUnitTestLogsByWebservice(dataCount)
        {
            $.ajaxSetup({cache: false});

            alert("callUnitTestLogsByWebservice => DataCount :"+dataCount);

            $.ajax({
                url: 'http://localhost/UnitTestLogCall.WebService/UnitTestLogCall.asmx/CallUnitTestLog',
                type: 'POST',
                dataType: 'xml',
                data: {'dataCount': dataCount },
                success:callUnitTestLogsByWebservice_LoadData_OnSuccess,
                /*
                    function (response)
                    {
                        var xmlString = new XMLSerializer().serializeToString(response);
                        alert(xmlString);
                    },
                */
                error: function (response)
                {
                    alert("Web servis çağrısı başarısız. Hata: " + response.statusText);
                }
            });
        }
        export function callUnitTestLogsByWebApi(dataCount)
        {
            $.ajaxSetup({cache: false});

            $.ajax(
                {
                    url: "http://localhost:5008/api/UnitTestLogCall",
                    data: { dataCount: dataCount },
                    type: "GET",
                    dataType: "json",
                    crossDomain: true,
                    success: function (response) {

                        alert(response);

                        let tableBody2 = $("#tableBody");

                        response.forEach(function (row)
                        {
                            let newRow2 = $("<tr>");
                            newRow2.append($("<td>").text(row.nameSpace));
                            newRow2.append($("<td>").text(row.className));
                            newRow2.append($("<td>").text(row.methodName));
                            newRow2.append($("<td>").text(row.assertMethodName));
                            let status = (row.testStatus === 1) ? "Passed" : "Failed";
                            newRow2.append($("<td>").text(status));
                            tableBody2.append(newRow2);
                        });

                   },
                    error: function (xhr, status, error) {
                        alert("Error: " + error);
                    }
                });
            }

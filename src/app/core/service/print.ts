export class Print {
  static exportToPdf(id: string, name?: string) {
    let printContents, popupWin;
    printContents = document.getElementById(id).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
  <html>
    <head>
      <style>
      body{  width: 99%;}
        label { font-weight: 400;
                font-size: 13px;
                padding: 2px;
                margin-bottom: 5px;
              }
        table, td, th {
               border: 1px solid silver;
                }
                table td {
               font-size: 13px;
                }

                 table th {
               font-size: 13px;
                }
          table {
                border-collapse: collapse;
                width: 98%;
                }
            th {
                height: 26px;
                }
      </style>
    </head>
<body onload="window.print();window.close()">${printContents}</body>
  </html>`
    );
    popupWin.document.close();

}
}

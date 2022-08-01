function phoneFormat(input) {//returns (###) ###-####
    input = input.replace(/\D/g, '');
    const size = input.length;
    if (size > 0) {
        input = "(" + input
    }
    if (size > 3) {
        input = input.slice(0, 4) + ") " + input.slice(4, 11)
    }
    if (size > 6) {
        input = input.slice(0, 9) + "-" + input.slice(9)
    }
    return input;
}

// disable picking dates in the past on form
tournamentDate = document.getElementById("tournamentDate");
const today = new Date().toISOString().split('T')[0];
if (tournamentDate !== null) {
    tournamentDate.setAttribute('min', today);
}

// real time search of ITA averages
// onkeyup="searchIta()"
// function searchIta() {
//     let input, filter, found, table, tr, td, i, j;
//     input = document.getElementById("query");
//     filter = input.value.toUpperCase();
//     table = document.getElementById("ita-table");
//     tr = table.getElementsByTagName("tr");
//     for (i = 0; i < tr.length; i++) {
//         td = tr[i].getElementsByTagName("td");
//         for (j = 0; j < td.length; j++) {
//             if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
//                 found = true;
//             }
//         }
//         if (found) {
//             tr[i].style.display = "";
//             found = false;
//         } else {
//             tr[i].style.display = "none";
//         }
//     }
// }
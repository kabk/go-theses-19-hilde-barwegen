let activeFilter;

const filterTable = () => {
	$(".filter").click(function() {
		let filterCat = $(this).attr("filter");
		activeFilter = filterCat;

		$(".entry").each(function(){
			let $this = $(this);
			$this.hide();
			let entryCat = $this.attr("chap");
			entryCat = entryCat.split(" ")
			
			for (var i = 0; i < entryCat.length; i++) {
				if (entryCat[i] == filterCat) {
					$this.show();
				}
			}
		})
	});

	$(".clearAll").click(function() {
		$(".entry").show();
		activeFilter = "";
	});
};

const sortThenFilter = () => {
	if (activeFilter !== "") {
		$(".entry").each(function(){
			let $this = $(this);
			$this.hide();
			let entryCat = $this.attr("chap");
			entryCat = entryCat.split(" ")
			
			for (var i = 0; i < entryCat.length; i++) {
				if (entryCat[i] == activeFilter) {
					$this.show();
				}
			}
		});
	}
}

const rowCount = () => {
	let len = $(".entry").length;
	$(".entryCount").text(len);
}


const entryPage = () => {
	let headerH = $("header").outerHeight();

	$(".pageLink").click(function(){
		let table = `<table id="singleTable">
				<tr>
					<th>Index</th>
					<th>Name</th>
					<th>Date</th>
					<th>Source</th>
					<th>Author</th>
					<th>Image</th>
					<th>Upvotes / Likes</th>
				</tr>
			</table>`;
		let row = $(this).parent().parent().clone();
		let content = row.find(".content").clone();
		let entryPageBtns = `<div class="entryPageBtns"><span class="button back">Back</span> <span class="right"><span class="button prev">< Previous</span>&nbsp;&nbsp;&nbsp;<span class="button next">Next ></span></span></div>`;
		$("#mainPage").hide();
		$("#entryPage").show().append(entryPageBtns).append(table);
		$("#singleTable").append(row);
		$("#entryPage").append(content);

		$(".back").click(function(){
			$("#mainPage").show();
			$("#entryPage").empty().hide();
		});
	});
}

$(".entry").each(function(i){
	$(this).attr('ind', i);
});

const prevNext = () => {
	let headerH = $("header").outerHeight();

	

	$(".next").click(function(){
		console.log('aosidj')
		let table = `<table id="singleTable">
				<tr>
					<th>Index</th>
					<th>Name</th>
					<th>Date</th>
					<th>Source</th>
					<th>Author</th>
					<th>Image</th>
					<th>Upvotes / Likes</th>
				</tr>
			</table>`;
		let row = $("entry").eq(10).parent().parent().clone();
		let content = row.find(".content").clone();
		let entryPageBtns = `<div class="entryPageBtns"><span class="button back">Back</span> <span class="right"><span class="button prev">< Previous</span>&nbsp;&nbsp;&nbsp;<span class="button next">Next ></span></span></div>`;
		$("#mainPage").hide();
		$("#entryPage").empty().show().append(entryPageBtns).append(table);
		$("#singleTable").append(row);
		$("#entryPage").append(content);

		$(".back").click(function(){
			$("#mainPage").show();
			$("#entryPage").empty().hide();
		});
	});
}

const formatGraveyardEntries = () => {
	let count = 0;
	$(".entry").each(function(i){
		if ($(this).attr("chap") == "onlineGraveyard image") {
			$(this).find("td").eq(0).text("3.6."+count)
			// numbers here wrong i think
			let $content = $(this).find("td").eq(5)
			let $1stPhoto = $(this).find("td").eq(7).clone()
			let $2ndPhoto = $(this).find("td").eq(8).clone()
			let $upvotes = $(this).find("td").eq(6)
			$(this).find("td").eq(7).addClass('hidden')
			$content.append('<br><br>').append($1stPhoto).append('<br>');
			$content.append($2ndPhoto);
			$content.addClass('content');
			$upvotes.addClass("upvotes");
			count++;
		}
	})
}


filterTable(); // could simply output compted html and not use this function
rowCount();
entryPage();
prevNext();
formatGraveyardEntries();









////// SORT ROWS //////
let rows = []

$("#mainTable tr").each(function(i) {
	let $html = $(this).html();
	if (i !== 0) {
		// let originalDate = $(this).find(".originalDate").text();
		// originalDate = originalDate.split('.');
		// let addedDate = $(this).find(".addedDate").text();
		// addedDate = addedDate.split('.');
		// let source = $(this).find(".source").text().replace(/\t|\n|\r/g, "")
		// $(this).remove();
		// rows.push({
		// 	addedyear: addedDate[0],
		// 	addedmonth: addedDate[1],
		// 	addedday: addedDate[2],
		// 	originalD: new Date(`${originalDate[0]}-${originalDate[1]}-${originalDate[2]}T03:00:00`),
		// 	addedD: new Date(`${addedDate[0]}-${addedDate[1]}-${addedDate[2]}T03:00:00`),
		// 	source: source,
		// 	content: $html
		// });
		let index = $(this).find("td").eq(0).text().replace(/\s/g, "");
		let name = $(this).find("td").eq(1).text().replace(/\s/g, "");
		let date = $(this).find("td").eq(2).text().replace(/\s/g, "");
		let source = $(this).find("td").eq(3).text().replace(/\s/g, "");
		let author = $(this).find("td").eq(4).text().replace(/\s/g, "");
		let chap = $(this).attr("chap");

		rows.push({
			index: index,
			name: name,
			date: date,
			source: source,
			author: author,
			content: $html,
			chap: chap
		});
	}

})

const sort = (arr, sortByInd) => {
	$("#mainTable tr").each(function(i) {
		if (i !== 0) {
			$(this).remove();
		}

	})
	// if (by == "originalDate") {
	// 	arr.sort(function(a, b){
	// 	    var dateA=new Date(a.originalD), dateB=new Date(b.originalD)
	// 	    return dateB-dateA //sort by date ascending
	// 	})
	// } else if (by == "addedDate") {
	// 	arr.sort(function(a, b){
	// 	    var dateA=new Date(a.addedD), dateB=new Date(b.addedD)
	// 	    return dateB-dateA //sort by date ascending
	// 	})
	// } else if (by == "source")  {
	// 	arr.sort(function(a, b){
	// 	    var nameA=a.source.toLowerCase(), nameB=b.source.toLowerCase()
	// 	    if (nameA < nameB) //sort string ascending
	// 	        return -1 
	// 	    if (nameA > nameB)
	// 	        return 1
	// 	    return 0 //default return value (no sorting)
	// 	})
	// } else {
	// 	console.log('ERROR SORTINGGGG')
	// }

	// let sortBy = keys[sortByInd]
	if (sortByInd == 0) {
		function compare(a,b) {
		  if (a.index < b.index)
		    return -1;
		  if (a.index > b.index)
		    return 1;
		  return 0;
		}
		arr.sort(compare);
	} else if (sortByInd == 1) {
		function compare(a,b) {
		  if (a.name < b.name)
		    return -1;
		  if (a.name > b.name)
		    return 1;
		  return 0;
		}
		arr.sort(compare);
	} else if (sortByInd == 2) {
		function compare(a,b) {
		  if (a.date < b.date)
		    return -1;
		  if (a.date > b.date)
		    return 1;
		  return 0;
		}
		arr.sort(compare);
	} else if (sortByInd == 3) {
		function compare(a,b) {
		  if (a.source < b.source)
		    return -1;
		  if (a.source > b.source)
		    return 1;
		  return 0;
		}
		arr.sort(compare);
	} else if (sortByInd == 4) {
		function compare(a,b) {
		  if (a.author < b.author)
		    return -1;
		  if (a.author > b.author)
		    return 1;
		  return 0;
		}
		arr.sort(compare);
	} else {}

	arr.forEach(el => {
		$("#mainTable table").append(`<tr class="entry" chap="${el.chap}">${el.content}</tr>`);
	})

	sortThenFilter();
	filterTable(); // could simply output compted html and not use this function
	rowCount();
	entryPage();
	prevNext()
	formatGraveyardEntries();
}

$(".sortCol").each(function(i){
	$(this).click(function(){
		sort(rows, i)
	})
})












const lpad = (string, padString, length) => {
    var str = string.toString();
    while (str.length < length)
        str = padString + str;
    return str;
}


for (var i = 1; i < 199; i++) {
	$("#print").append(`<img src="img/thesisScan/book${i}.jpg"/>`);
}

$("#printBtn").click(function(){

	window.print();

});

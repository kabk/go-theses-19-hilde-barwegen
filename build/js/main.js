"use strict";

var activeFilter = void 0;

var filterTable = function filterTable() {
	$(".filter").click(function () {
		var filterCat = $(this).attr("filter");
		activeFilter = filterCat;

		$(".entry").each(function () {
			var $this = $(this);
			$this.hide();
			var entryCat = $this.attr("chap");
			entryCat = entryCat.split(" ");

			for (var i = 0; i < entryCat.length; i++) {
				if (entryCat[i] == filterCat) {
					$this.show();
				}
			}
		});
	});

	$(".clearAll").click(function () {
		$(".entry").show();
		activeFilter = "";
	});
};

var sortThenFilter = function sortThenFilter() {
	if (activeFilter !== "") {
		$(".entry").each(function () {
			var $this = $(this);
			$this.hide();
			var entryCat = $this.attr("chap");
			entryCat = entryCat.split(" ");

			for (var i = 0; i < entryCat.length; i++) {
				if (entryCat[i] == activeFilter) {
					$this.show();
				}
			}
		});
	}
};

var rowCount = function rowCount() {
	var len = $(".entry").length;
	$(".entryCount").text(len);
};

var entryPage = function entryPage() {
	var headerH = $("header").outerHeight();

	$(".pageLink").click(function () {
		var table = "<table id=\"singleTable\">\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Index</th>\n\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t<th>Source</th>\n\t\t\t\t\t<th>Author</th>\n\t\t\t\t\t<th>Image</th>\n\t\t\t\t\t<th>Upvotes / Likes</th>\n\t\t\t\t</tr>\n\t\t\t</table>";
		var row = $(this).parent().parent().clone();
		var content = row.find(".content").clone();
		var entryPageBtns = "<div class=\"entryPageBtns\"><span class=\"button back\">Back</span> <span class=\"right\"><span class=\"button prev\">< Previous</span>&nbsp;&nbsp;&nbsp;<span class=\"button next\">Next ></span></span></div>";
		$("#mainPage").hide();
		$("#entryPage").show().append(entryPageBtns).append(table);
		$("#singleTable").append(row);
		$("#entryPage").append(content);

		$(".back").click(function () {
			$("#mainPage").show();
			$("#entryPage").empty().hide();
		});
	});
};

$(".entry").each(function (i) {
	$(this).attr('ind', i);
});

var prevNext = function prevNext() {
	var headerH = $("header").outerHeight();

	$(".next").click(function () {
		console.log('aosidj');
		var table = "<table id=\"singleTable\">\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Index</th>\n\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t<th>Source</th>\n\t\t\t\t\t<th>Author</th>\n\t\t\t\t\t<th>Image</th>\n\t\t\t\t\t<th>Upvotes / Likes</th>\n\t\t\t\t</tr>\n\t\t\t</table>";
		var row = $("entry").eq(10).parent().parent().clone();
		var content = row.find(".content").clone();
		var entryPageBtns = "<div class=\"entryPageBtns\"><span class=\"button back\">Back</span> <span class=\"right\"><span class=\"button prev\">< Previous</span>&nbsp;&nbsp;&nbsp;<span class=\"button next\">Next ></span></span></div>";
		$("#mainPage").hide();
		$("#entryPage").empty().show().append(entryPageBtns).append(table);
		$("#singleTable").append(row);
		$("#entryPage").append(content);

		$(".back").click(function () {
			$("#mainPage").show();
			$("#entryPage").empty().hide();
		});
	});
};

var formatGraveyardEntries = function formatGraveyardEntries() {
	var count = 0;
	$(".entry").each(function (i) {
		if ($(this).attr("chap") == "onlineGraveyard image") {
			$(this).find("td").eq(0).text("3.6." + count);
			// numbers here wrong i think
			var $content = $(this).find("td").eq(5);
			var $1stPhoto = $(this).find("td").eq(7).clone();
			var $2ndPhoto = $(this).find("td").eq(8).clone();
			var $upvotes = $(this).find("td").eq(6);
			$(this).find("td").eq(7).addClass('hidden');
			$content.append('<br><br>').append($1stPhoto).append('<br>');
			$content.append($2ndPhoto);
			$content.addClass('content');
			$upvotes.addClass("upvotes");
			count++;
		}
	});
};

filterTable(); // could simply output compted html and not use this function
rowCount();
entryPage();
prevNext();
formatGraveyardEntries();

////// SORT ROWS //////
var rows = [];

$("#mainTable tr").each(function (i) {
	var $html = $(this).html();
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
		var index = $(this).find("td").eq(0).text().replace(/\s/g, "");
		var name = $(this).find("td").eq(1).text().replace(/\s/g, "");
		var date = $(this).find("td").eq(2).text().replace(/\s/g, "");
		var source = $(this).find("td").eq(3).text().replace(/\s/g, "");
		var author = $(this).find("td").eq(4).text().replace(/\s/g, "");
		var chap = $(this).attr("chap");

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
});

var sort = function sort(arr, sortByInd) {
	$("#mainTable tr").each(function (i) {
		if (i !== 0) {
			$(this).remove();
		}
	});
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
		var compare = function compare(a, b) {
			if (a.index < b.index) return -1;
			if (a.index > b.index) return 1;
			return 0;
		};

		arr.sort(compare);
	} else if (sortByInd == 1) {
		var _compare = function _compare(a, b) {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		};

		arr.sort(_compare);
	} else if (sortByInd == 2) {
		var _compare2 = function _compare2(a, b) {
			if (a.date < b.date) return -1;
			if (a.date > b.date) return 1;
			return 0;
		};

		arr.sort(_compare2);
	} else if (sortByInd == 3) {
		var _compare3 = function _compare3(a, b) {
			if (a.source < b.source) return -1;
			if (a.source > b.source) return 1;
			return 0;
		};

		arr.sort(_compare3);
	} else if (sortByInd == 4) {
		var _compare4 = function _compare4(a, b) {
			if (a.author < b.author) return -1;
			if (a.author > b.author) return 1;
			return 0;
		};

		arr.sort(_compare4);
	} else {}

	arr.forEach(function (el) {
		$("#mainTable table").append("<tr class=\"entry\" chap=\"" + el.chap + "\">" + el.content + "</tr>");
	});

	sortThenFilter();
	filterTable(); // could simply output compted html and not use this function
	rowCount();
	entryPage();
	prevNext();
	formatGraveyardEntries();
};

$(".sortCol").each(function (i) {
	$(this).click(function () {
		sort(rows, i);
	});
});

var lpad = function lpad(string, padString, length) {
	var str = string.toString();
	while (str.length < length) {
		str = padString + str;
	}return str;
};

for (var i = 1; i < 199; i++) {
	$("#print").append("<img src=\"img/thesisScan/book" + i + ".jpg\"/>");
}

$("#printBtn").click(function () {

	window.print();
});
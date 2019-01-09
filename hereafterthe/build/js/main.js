"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var clickImg = function clickImg() {
	$("img").each(function () {
		var $this = $(this);
		$this.click(function () {
			if ($this.hasClass("bigImg")) {
				$this.removeClass("bigImg");
			} else {
				$this.addClass("bigImg");
				setTimeout(function () {
					$('html, body').animate({
						scrollTop: $this.offset().top - 5
					}, 100);
				}, 90);
			}
		});
	});
};

var clickableSorter = function clickableSorter() {
	$(".filter").each(function () {
		$(this).click(function () {
			$(".filter").removeClass("active");
			$(this).addClass('active');
			var filterBy = $(this).attr("filter");
			sort(rows, filterBy);
		});
	});
};

var filters = function filters() {
	var finalTags = [];
	var tagsActive = [];
	tags = [].concat(_toConsumableArray(new Set(tags)));
	tags.forEach(function (tag, i) {
		if (tag !== undefined) {
			finalTags.push(tag);
			tagsActive.push(false);
		}
	});
	console.log(finalTags);

	finalTags.forEach(function (tag) {
		$("#filterBy").append("<span class=\"tagFilter\">" + tag + "</span>&nbsp;&nbsp;&nbsp;&nbsp;");
		// $("#filterBy").append('lol')
	});

	$(".tagFilter").each(function (ind) {
		var $tagFilter = $(this);

		$(this).click(function () {
			var tagText = $(this).text();
			if (!tagsActive[ind]) {
				$(".tagFilter").removeClass("active");
				$tagFilter.addClass("active");
				$("tr").each(function (i) {
					$(this).show();
					if (i > 3) {
						// first two rows always visible
						if (tagText == $(this).find(".source").attr("tag")) {
							// nothing
						} else {
							$(this).hide();
						}
					}
				});
			} else {
				$tagFilter.removeClass("active");
				$("tr").show();
			}
			tagsActive[ind] = !tagsActive[ind];
		});
	});
};

////// SORT ROWS //////
var tags = [];
var rows = [];
var sortBy = "originalDate";

$("tr").each(function (i) {
	var $html = $(this).html();
	var tag = $(this).find(".source").attr("tag");
	tags.push(tag);

	if (i > 1) {
		var originalDate = $(this).find(".originalDate").text();
		originalDate = originalDate.split('.');
		var addedDate = $(this).find(".addedDate").text();
		addedDate = addedDate.split('.');
		var source = $(this).find(".source").text().replace(/\t|\n|\r/g, "");
		// $(this).remove();
		rows.push({
			addedyear: addedDate[0],
			addedmonth: addedDate[1],
			addedday: addedDate[2],
			originalD: new Date(originalDate[0] + "-" + originalDate[1] + "-" + originalDate[2] + "T03:00:00"),
			addedD: new Date(addedDate[0] + "-" + addedDate[1] + "-" + addedDate[2] + "T03:00:00"),
			source: source,
			content: $html
		});
	}
});

var sort = function sort(arr, by) {
	$("tr").each(function (i) {
		if (i > 1) {
			$(this).remove();
		}
	});
	if (by == "originalDate") {
		arr.sort(function (a, b) {
			var dateA = new Date(a.originalD),
			    dateB = new Date(b.originalD);
			return dateB - dateA; //sort by date ascending
		});
	} else if (by == "addedDate") {
		arr.sort(function (a, b) {
			var dateA = new Date(a.addedD),
			    dateB = new Date(b.addedD);
			return dateB - dateA; //sort by date ascending
		});
	} else if (by == "source") {
		arr.sort(function (a, b) {
			var nameA = a.source.toLowerCase(),
			    nameB = b.source.toLowerCase();
			if (nameA < nameB) //sort string ascending
				return -1;
			if (nameA > nameB) return 1;
			return 0; //default return value (no sorting)
		});
	} else {
		console.log('ERROR SORTINGGGG');
	}

	arr.forEach(function (el) {
		$("table").append("<tr>" + el.content + "</tr>");
	});
	clickImg();
	clickableSorter();
	filters();
};

sort(rows, "addedDate");
clickableSorter();

// filters();
// console.log(rows[0].originalD)
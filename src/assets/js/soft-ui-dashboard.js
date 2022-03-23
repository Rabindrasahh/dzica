// initialization of Tooltips
var tooltipTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
tooltipTriggerList.map(function(tooltipTriggerEl) {
	return new global.bootstrap.Tooltip(tooltipTriggerEl);
});

// Fixed Plugin

if (document.querySelector(".fixed-plugin")) {
	var fixedPlugin = document.querySelector(".fixed-plugin");
	var fixedPluginButton = document.querySelector(".fixed-plugin-button");
	var fixedPluginButtonNav = document.querySelector(
		".fixed-plugin-button-nav"
	);
	var fixedPluginCard = document.querySelector(".fixed-plugin .card");
	var fixedPluginCloseButton = document.querySelectorAll(
		".fixed-plugin-close-button"
	);
	var navbar = document.getElementById("navbarBlur");
	var buttonNavbarFixed = document.getElementById("navbarFixed");

	if (fixedPluginButton) {
		fixedPluginButton.onclick = function() {
			if (!fixedPlugin.classList.contains("show")) {
				fixedPlugin.classList.add("show");
			} else {
				fixedPlugin.classList.remove("show");
			}
		};
	}

	if (fixedPluginButtonNav) {
		fixedPluginButtonNav.onclick = function() {
			if (!fixedPlugin.classList.contains("show")) {
				fixedPlugin.classList.add("show");
			} else {
				fixedPlugin.classList.remove("show");
			}
		};
	}

	fixedPluginCloseButton.forEach(function(el) {
		el.onclick = function() {
			fixedPlugin.classList.remove("show");
		};
	});

	document.querySelector("body").onclick = function(e) {
		if (
			e.target != fixedPluginButton &&
			e.target != fixedPluginButtonNav &&
			e.target.closest(".fixed-plugin .card") != fixedPluginCard
		) {
			fixedPlugin.classList.remove("show");
		}
	};

	if (navbar) {
		if (navbar.getAttribute("navbar-scroll") == "true") {
			buttonNavbarFixed.setAttribute("checked", "true");
		}
	}
}

// Tabs navigation

var total = document.querySelectorAll(".nav-pills");

total.forEach(function(item) {
	var moving_div = document.createElement("div");
	var first_li = item.querySelector("li:first-child .nav-link");
	var tab = first_li.cloneNode();
	tab.innerHTML = "-";

	moving_div.classList.add("moving-tab", "position-absolute", "nav-link");
	moving_div.appendChild(tab);
	item.appendChild(moving_div);

	// var list_length = item.getElementsByTagName("li").length;

	moving_div.style.padding = "0px";
	moving_div.style.width =
		item.querySelector("li:nth-child(1)").offsetWidth + "px";
	moving_div.style.transform = "translate3d(0px, 0px, 0px)";
	moving_div.style.transition = ".5s ease";

	item.onmouseover = function(event) {
		let target = getEventTarget(event);
		let li = target.closest("li"); // get reference
		if (li) {
			let nodes = Array.from(li.closest("ul").children); // get array
			let index = nodes.indexOf(li) + 1;
			item.querySelector(
				"li:nth-child(" + index + ") .nav-link"
			).onclick = function() {
				moving_div = item.querySelector(".moving-tab");
				let sum = 0;
				if (item.classList.contains("flex-column")) {
					for (var j = 1; j <= nodes.indexOf(li); j++) {
						sum += item.querySelector("li:nth-child(" + j + ")")
							.offsetHeight;
					}
					moving_div.style.transform =
						"translate3d(0px," + sum + "px, 0px)";
					moving_div.style.height = item.querySelector(
						"li:nth-child(" + j + ")"
					).offsetHeight;
				} else {
					for (let j = 1; j <= nodes.indexOf(li); j++) {
						sum += item.querySelector("li:nth-child(" + j + ")")
							.offsetWidth;
					}
					moving_div.style.transform =
						"translate3d(" + sum + "px, 0px, 0px)";
					moving_div.style.width =
						item.querySelector("li:nth-child(" + index + ")")
							.offsetWidth + "px";
				}
			};
		}
	};
});

// Tabs navigation resize

window.addEventListener("resize", function() {
	total.forEach(function(item) {
		item.querySelector(".moving-tab").remove();
		var moving_div = document.createElement("div");
		var tab = item.querySelector(".nav-link.active").cloneNode();
		tab.innerHTML = "-";

		moving_div.classList.add("moving-tab", "position-absolute", "nav-link");
		moving_div.appendChild(tab);

		item.appendChild(moving_div);

		moving_div.style.padding = "0px";
		moving_div.style.transition = ".5s ease";

		let li = item.querySelector(".nav-link.active").parentElement;

		if (li) {
			let nodes = Array.from(li.closest("ul").children); // get array
			let index = nodes.indexOf(li) + 1;

			let sum = 0;
			if (item.classList.contains("flex-column")) {
				for (var j = 1; j <= nodes.indexOf(li); j++) {
					sum += item.querySelector("li:nth-child(" + j + ")")
						.offsetHeight;
				}
				moving_div.style.transform =
					"translate3d(0px," + sum + "px, 0px)";
				moving_div.style.width =
					item.querySelector("li:nth-child(" + index + ")")
						.offsetWidth + "px";
				moving_div.style.height = item.querySelector(
					"li:nth-child(" + j + ")"
				).offsetHeight;
			} else {
				for (let j = 1; j <= nodes.indexOf(li); j++) {
					sum += item.querySelector("li:nth-child(" + j + ")")
						.offsetWidth;
				}
				moving_div.style.transform =
					"translate3d(" + sum + "px, 0px, 0px)";
				moving_div.style.width =
					item.querySelector("li:nth-child(" + index + ")")
						.offsetWidth + "px";
			}
		}
	});

	if (window.innerWidth < 991) {
		total.forEach(function(item) {
			if (!item.classList.contains("flex-column")) {
				item.classList.add("flex-column", "on-resize");
			}
		});
	} else {
		total.forEach(function(item) {
			if (item.classList.contains("on-resize")) {
				item.classList.remove("flex-column", "on-resize");
			}
		});
	}
});

function getEventTarget(e) {
	e = e || window.event;
	return e.target || e.srcElement;
}

// End tabs navigation

// Toggle Sidenav
const iconNavbarSidenav = document.getElementById("iconNavbarSidenav");
const iconSidenav = document.getElementById("iconSidenav");
const sidenav = document.getElementById("sidenav-main");
let body = document.getElementsByTagName("body")[0];
let className = "g-sidenav-pinned";

if (iconNavbarSidenav) {
	iconNavbarSidenav.addEventListener("click", toggleSidenav);
}

if (iconSidenav) {
	iconSidenav.addEventListener("click", toggleSidenav);
}

function toggleSidenav() {
	console.log("asfasf");
	if (body.classList.contains(className)) {
		body.classList.remove(className);
		setTimeout(function() {
			sidenav.classList.remove("bg-white");
		}, 100);
		sidenav.classList.remove("bg-transparent");
	} else {
		body.classList.add(className);
		sidenav.classList.add("bg-white");
		sidenav.classList.remove("bg-transparent");
		iconSidenav.classList.remove("d-none");
	}
}

// Deactivate sidenav type buttons on resize and small screens
window.addEventListener("resize", sidenavTypeOnResize);
window.addEventListener("load", sidenavTypeOnResize);

function sidenavTypeOnResize() {
	let elements = document.querySelectorAll('[onclick="sidebarType(this)"]');
	if (window.innerWidth < 1200) {
		elements.forEach(function(el) {
			el.classList.add("disabled");
		});
	} else {
		elements.forEach(function(el) {
			el.classList.remove("disabled");
		});
	}
}

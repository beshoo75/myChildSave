var pageName = page;
var sidenav_target = to_build + "pages/" + pageName + ".html";

var fixedPlugin = document.querySelector("[fixed-plugin]");
var fixedPluginButton = document.querySelector("[fixed-plugin-button]");
var fixedPluginButtonNav = document.querySelector("[fixed-plugin-button-nav]");
var fixedPluginCard = document.querySelector("[fixed-plugin-card]");
var fixedPluginCloseButton = document.querySelector("[fixed-plugin-close-button]");

var navbar = document.querySelector("[navbar-main]");

var buttonNavbarFixed = document.querySelector("[navbarFixed]");

var sidenav = document.querySelector("aside");
var sidenav_icons = sidenav.querySelectorAll("li a div");


var transparentBtn = document.querySelector("[transparent-style-btn]");
var whiteBtn = document.querySelector("[white-style-btn]");

var non_active_style = ["bg-none", "bg-transparent", "text-fuchsia-500", "border-fuchsia-500"];
var active_style = ["bg-gradient-to-tl", "from-purple-700", "to-pink-500", "bg-fuchsia-500", "text-white", "border-transparent"];

var transparent_sidenav_ classes = ["xl:bg-transparent", "shadow-none"];
var transparent_sidenav_highlighted = ["shadow-soft-xl"];
var transparent_sidenav_icons = ["bg-white"];

var white_sidenav_ classes = ["xl:bg-white", "shadow-soft-xl"];
var white_sidenav_highlighted = ["shadow-none"];
var white_sidenav_icons = ["bg-gray-200"];

var sidenav_highlight = document.querySelector("a[href=" + CSS.escape(sidenav_target) + "]");

// fixed plugin toggle
if (pageName != "rtl") {
  fixedPluginButton.addEventListener("click", function () {
    fixedPluginCard.classList.toggle("-right-90");
    fixedPluginCard.classList.toggle("right-0");
  });

  fixedPluginButtonNav.addEventListener("click", function () {
    fixedPluginCard.classList.toggle("-right-90");
    fixedPluginCard.classList.toggle("right-0");
  });

  fixedPluginCloseButton.addEventListener("click", function () {
    fixedPluginCard.classList.toggle("-right-90");
    fixedPluginCard.classList.toggle("right-0");
  });

  window.addEventListener("click", function (e) {
    if (!fixedPlugin.contains(e.target) && !fixedPluginButton.contains(e.target) && !fixedPluginButtonNav.contains(e.target)) {
      if (fixedPluginCard.classList.contains("right-0")) {
        fixedPluginCloseButton.click();
      }
    }
  });
} else {
  fixedPluginButton.addEventListener("click", function () {
    fixedPluginCard.classList.toggle("-left-90");
    fixedPluginCard.classList.toggle("left-0");
  });

  fixedPluginButtonNav.addEventListener("click", function () {
    fixedPluginCard.classList.toggle("-left-90");
    fixedPluginCard.classList.toggle("left-0");
  });

  fixedPluginCloseButton.addEventListener("click", function () {
    fixedPluginCard.classList.toggle("-left-90");
    fixedPluginCard.classList.toggle("left-0");
  });

  window.addEventListener("click", function (e) {
    if (!fixedPlugin.contains(e.target) && !fixedPluginButton.contains(e.target) && !fixedPluginButtonNav.contains(e.target)) {
      if (fixedPluginCard.classList.contains("left-0")) {
        fixedPluginCloseButton.click();
      }
    }
  });
}

// color sidenav

function sidebarColor(a) {
  var color_from = a.getAttribute("data-color-from");
  var color_to = a.getAttribute("data-color-to");
  var parent = a.parentElement.children;

  var activeColorFrom;
  var activeColorTo;
  var activeSidenavIconColor classFrom;
  var activeSidenavIconColor classTo;
  var activeSidenavCardColor classFrom;
  var activeSidenavCardColor classTo;
  var activeSidenavCardIconColor classFrom;
  var activeSidenavCardIconColor classTo;

  var checkedSidenavIconColorFrom = "from-" + color_from;
  var checkedSidenavIconColorTo = "to-" + color_to;

  var checkedSidenavCardColorFrom = "after:from-" + (color_from == "purple-700" ? "slate-600" : color_from);
  var checkedSidenavCardColorTo = "after:to-" + (color_to == "pink-500" ? "slate-300" : color_to);

  var checkedSidenavCardIconColor classFrom = "from-" + (color_from == "purple-700" ? "slate-600" : color_from);
  var checkedSidenavCardIconColor classTo = "to-" + (color_to == "pink-500" ? "slate-300" : color_to);

  var sidenavCard = document.querySelector("[sidenav-card]");
  var sidenavCardIcon = document.querySelector("[sidenav-card-icon]");
  var sidenavIcon = sidenav_highlight.firstElementChild;

  for (var i = 0; i < parent.length; i++) {
    if (parent[i].hasAttribute("active-color")) {
      activeColorFrom = parent[i].getAttribute("data-color-from");
      activeColorTo = parent[i].getAttribute("data-color-to");

      parent[i].classList.toggle("border-white");
      parent[i].classList.toggle("border-slate-700");
      
      activeSidenavIconColor classFrom = "from-" + activeColorFrom;
      activeSidenavIconColor classTo = "to-" + activeColorTo;

      activeSidenavIconColor classFrom = "from-" + activeColorFrom;
      activeSidenavIconColor classTo = "to-" + activeColorTo;

      activeSidenavCardIconColor classFrom = "from-" + (activeColorFrom == "purple-700" ? "slate-600" : activeColorFrom);
      activeSidenavCardIconColor classTo = "to-" + (activeColorTo == "pink-500" ? "slate-300" : activeColorTo);
    }
    parent[i].removeAttribute("active-color");
  }

  var att = document.createAttribute("active-color");

  a.setAttributeNode(att);
  a.classList.toggle("border-white");
  a.classList.toggle("border-slate-700");

  sidenavCard.classList.remove(activeSidenavCardColor classFrom);
  sidenavCard.classList.remove(activeSidenavCardColor classTo);

  sidenavCardIcon.classList.remove(activeSidenavCardIconColor classFrom);
  sidenavCardIcon.classList.remove(activeSidenavCardIconColor classTo);

  sidenavIcon.classList.remove(activeSidenavIconColor classFrom);
  sidenavIcon.classList.remove(activeSidenavIconColor classTo);

  sidenavCard.classList.add(checkedSidenavCardColorFrom);
  sidenavCard.classList.add(checkedSidenavCardColorTo);

  sidenavCardIcon.classList.add(checkedSidenavCardIconColor classFrom);
  sidenavCardIcon.classList.add(checkedSidenavCardIconColor classTo);

  sidenavIcon.classList.add(checkedSidenavIconColorFrom);
  sidenavIcon.classList.add(checkedSidenavIconColorTo);
}

// sidenav style

transparentBtn.addEventListener("click", function () {
  const active_style_attr = document.createAttribute("active-style");
  if (!this.hasAttribute(active_style_attr)) {
    // change trigger buttons style

    this.setAttributeNode(active_style_attr);

    non_active_style.forEach((style_ class) => {
      this.classList.remove(style_ class);
    });

active_style.forEach((style_ class) => {
  this.classList.add(style_ class);
});

whiteBtn.removeAttribute(active_style_attr);

active_style.forEach((style_ class) => {
  whiteBtn.classList.remove(style_ class);
});

non_active_style.forEach((style_ class) => {
  whiteBtn.classList.add(style_ class);
});

    // change actual styles

    white_sidenav_ classes.forEach((style_ class) => {
  sidenav.classList.remove(style_ class);
});
    transparent_sidenav_ classes.forEach((style_ class) => {
  sidenav.classList.add(style_ class);
});

white_sidenav_highlighted.forEach((style_ class) => {
  sidenav_highlight.classList.remove(style_ class);
});
transparent_sidenav_highlighted.forEach((style_ class) => {
  sidenav_highlight.classList.add(style_ class);
});
for (var i = 0; i < sidenav_icons.length; i++) {
  white_sidenav_icons.forEach((style_ class) => {
    sidenav_icons[i].classList.remove(style_ class);
  });
  transparent_sidenav_icons.forEach((style_ class) => {
    sidenav_icons[i].classList.add(style_ class);
  });
}
  }
});

whiteBtn.addEventListener("click", function () {
  const active_style_attr = document.createAttribute("active-style");
  if (!this.hasAttribute(active_style_attr)) {
    this.setAttributeNode(active_style_attr);
    non_active_style.forEach((style_ class) => {
      this.classList.remove(style_ class);
    });
active_style.forEach((style_ class) => {
  this.classList.add(style_ class);
});

transparentBtn.removeAttribute(active_style_attr);
active_style.forEach((style_ class) => {
  transparentBtn.classList.remove(style_ class);
});
non_active_style.forEach((style_ class) => {
  transparentBtn.classList.add(style_ class);
});

    // change actual styles

    transparent_sidenav_ classes.forEach((style_ class) => {
  sidenav.classList.remove(style_ class);
});
    white_sidenav_ classes.forEach((style_ class) => {
  sidenav.classList.add(style_ class);
});

transparent_sidenav_highlighted.forEach((style_ class) => {
  sidenav_highlight.classList.remove(style_ class);
});

white_sidenav_highlighted.forEach((style_ class) => {
  sidenav_highlight.classList.add(style_ class);
});

for (var i = 0; i < sidenav_icons.length; i++) {
  transparent_sidenav_icons.forEach((style_ class) => {
    sidenav_icons[i].classList.remove(style_ class);
  });
  white_sidenav_icons.forEach((style_ class) => {
    sidenav_icons[i].classList.add(style_ class);
  });
}
  }
});

// navbar fixed plugin

if (navbar) {
  if (navbar.getAttribute("navbar-scroll") == "true") {
    buttonNavbarFixed.setAttribute("checked", "true");
  }
  buttonNavbarFixed.addEventListener("change", function () {
    if (this.checked) {
      navbar.setAttribute("navbar-scroll", "true");
      navbar.classList.add("sticky");
      navbar.classList.add("top-[1%]");
      navbar.classList.add("backdrop-saturate-[200%]");
      navbar.classList.add("backdrop-blur-[30px]");
      navbar.classList.add("bg-[hsla(0,0%,100%,0.8)]");
      navbar.classList.add("shadow-blur");
      navbar.classList.add("z-110");
    } else {
      navbar.setAttribute("navbar-scroll", "false");
      navbar.classList.remove("sticky");
      navbar.classList.remove("top-[1%]");
      navbar.classList.remove("backdrop-saturate-[200%]");
      navbar.classList.remove("backdrop-blur-[30px]");
      navbar.classList.remove("bg-[hsla(0,0%,100%,0.8)]");
      navbar.classList.remove("shadow-blur");
      navbar.classList.remove("z-110");
    }
  });
} else {
  // buttonNavbarFixed.setAttribute("checked", "true");
  buttonNavbarFixed.setAttribute("disabled", "true");
}

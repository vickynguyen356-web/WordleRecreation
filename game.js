function toggleDropdown() {
    document.getElementById("helpDropdown").classList.toggle("show");
}

/* if user clicks outside, close dropdown */
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn') && !event.target.closest('.dropdown-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
$(function() {
    // Attaching DOM elements to variables
    var $tasksList = $("#tasksList");
    var $taskInput = $("#taskInput");
    var $notification = $("#notification");

    // Function to display or hide the notification
    var displayNotification = function() {
        if (!$tasksList.children().length) {
            $notification.fadeIn("fast");
        } else {
            $notification.css("display", "none");
        }
    }

    // Function to load tasks from local storage
    var loadTasks = function() {
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function(task) {
            $tasksList.append("<li>" + task + "<button class='delete'>&#10006</button></li>");
        });
        displayNotification();
    }

    // Function to save tasks to local storage
    var saveTasks = function() {
        var tasks = [];
        $tasksList.children().each(function() {
            tasks.push($(this).contents().get(0).nodeValue.trim());
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks on page load
    loadTasks();

    // Attaching event handler to the add button
    $("#taskAdd").on("click", function() {
        // Returning false if the input is empty
        if (!$taskInput.val()) { return false; }

        // Appending li with the input value
        $tasksList.append("<li>" + $taskInput.val() + "<button class='delete'>&#10006</button></li>");

        // Cleaning input after add event
        $taskInput.val("");

        // Save tasks to local storage
        saveTasks();

        // Display/Hide Notification
        displayNotification();
    });

    // Event delegation for delete buttons
    $tasksList.on("click", ".delete", function() {
        var $parent = $(this).parent();
        $parent.css("animation", "fadeOut .3s linear");

        setTimeout(function() {
            $parent.remove();
            saveTasks(); // Save tasks after deletion
            displayNotification();
        }, 295);
    });

    // Theme toggle functionality
    $("#toggleButton").on("click", function() {
        $("body").toggleClass("dark");
        $("#container").toggleClass("dark");
    });
});

/*
 * Defines a task.
 * A task displays some text desribing something the user wants to do.
 * It can be edited and marked as complete.
 * Tasks can also notify others that they should be deleted.
 */
var Task = (function () {
    /*
     * Initializes a new Task.
     *
     * @param {HTMLElement} An element that should act as a container for the task's UI.
     * @param {string} A description of the task.
     */
    function Task(container, description) {
        var _this = this;
        this.container = container;
        this.description = description;
        container.innerHTML = "\n<span>" + description + "</span>\n<input type=\"text\" value=\"" + description + "\" />\n<button data-role=\"edit\">Edit</button>\n<button data-role=\"save\">Save</button>\n<button data-role=\"cancel\">Cancel</button>\n";
        this.descriptionSpan = container.querySelector("span");
        this.descriptionInput = container.querySelector("input");
        this.editButton = container.querySelector("button[data-role=edit]");
        this.saveButton = container.querySelector("button[data-role=save]");
        this.cancelButton = container.querySelector("button[data-role=cancel]");
        this.saveButton.style.display = "none";
        this.cancelButton.style.display = "none";
        this.descriptionInput.style.display = "none";
        this.editButton.addEventListener("click", function () { return _this.beginEdit(); });
        this.saveButton.addEventListener("click", function () { return _this.save(); });
        this.cancelButton.addEventListener("click", function () { return _this.cancelEdit(); });
    }
    Task.prototype.beginEdit = function () {
        this.editButton.style.display = "none";
        this.descriptionSpan.style.display = "none";
        this.descriptionInput.style.display = "inline-block";
        this.saveButton.style.display = "inline-block";
        this.cancelButton.style.display = "inline-block";
        this.descriptionInput.focus();
        this.descriptionInput.select();
    };
    Task.prototype.save = function () {
        this.descriptionSpan.innerHTML = this.descriptionInput.value;
        this.editButton.style.display = "inline-block";
        this.descriptionSpan.style.display = "inline-block";
        this.descriptionInput.style.display = "none";
        this.saveButton.style.display = "none";
        this.cancelButton.style.display = "none";
    };
    Task.prototype.cancelEdit = function () {
        this.editButton.style.display = "inline-block";
        this.descriptionSpan.style.display = "inline-block";
        this.descriptionInput.style.display = "none";
        this.saveButton.style.display = "none";
        this.cancelButton.style.display = "none";
    };
    return Task;
})();

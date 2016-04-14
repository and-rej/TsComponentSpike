/*
 * Defines a task.
 * A task displays some text desribing something the user wants to do.
 * It can be edited and marked as complete.
 * Tasks can also notify others that they should be deleted.
 */
class Task {
	private completeInput: HTMLInputElement;
	private descriptionSpan: HTMLSpanElement;
	private descriptionInput: HTMLInputElement;
	private editButton: HTMLButtonElement;
	private saveButton: HTMLButtonElement;
	private cancelButton: HTMLButtonElement;

	/*
	 * Initializes a new Task.
	 *
	 * @param {HTMLElement} An element that should act as a container for the task's UI.
	 * @param {string} A description of the task.
	 */
	constructor(private container: HTMLElement, private taskDto: ITaskDto, private onCompleteChanged: () => void) {
		container.innerHTML = `
<input type="checkbox" class="one column" />
<span class="seven columns">${taskDto.description}</span>
<input type="text" class="seven columns" value="${taskDto.description}" />
<button data-role="edit" class="four columns">Edit</button>
<button data-role="save" class="two columns">Save</button>
<button data-role="cancel" class="two columns">Cancel</button>
`;

		this.completeInput = <HTMLInputElement>container.querySelector("input[type=checkbox]");
		this.descriptionSpan = <HTMLSpanElement>container.querySelector("span");
		this.descriptionInput = <HTMLInputElement>container.querySelector("input[type=text]");
		this.editButton = <HTMLButtonElement>container.querySelector("button[data-role=edit]");
		this.saveButton = <HTMLButtonElement>container.querySelector("button[data-role=save]");
		this.cancelButton = <HTMLButtonElement>container.querySelector("button[data-role=cancel]");

		this.saveButton.style.display = "none";
		this.cancelButton.style.display = "none";
		this.descriptionInput.style.display = "none";

		this.completeInput.checked = taskDto.complete;

		this.completeInput.addEventListener("click", () => this.completeChanged());
		this.editButton.addEventListener("click", () => this.beginEdit());
		this.saveButton.addEventListener("click", () => this.save());
		this.cancelButton.addEventListener("click", () => this.cancelEdit());
	}

	/*
	 * Gets a value indicating whether or not the task is complete.
	 */
	public get complete(): boolean {
		return this.taskDto.complete;
	}

	private completeChanged() {
		this.taskDto.complete = this.completeInput.checked;
		this.onCompleteChanged();
	}

	private beginEdit() {
		this.editButton.style.display = "none";
		this.descriptionSpan.style.display = "none";
		this.descriptionInput.style.display = "inline-block";
		this.saveButton.style.display = "inline-block";
		this.cancelButton.style.display = "inline-block";

		this.descriptionInput.focus();
		this.descriptionInput.select();
	}

	private save() {
		this.descriptionSpan.innerHTML = this.taskDto.description = this.descriptionInput.value;

		this.editButton.style.display = "inline-block";
		this.descriptionSpan.style.display = "inline-block";
		this.descriptionInput.style.display = "none";
		this.saveButton.style.display = "none";
		this.cancelButton.style.display = "none";
	}

	private cancelEdit() {
		this.editButton.style.display = "inline-block";
		this.descriptionSpan.style.display = "inline-block";
		this.descriptionInput.style.display = "none";
		this.saveButton.style.display = "none";
		this.cancelButton.style.display = "none";
	}
}
Office.onReady(() => {
  document.getElementById("openDoubleJump").onclick = openDoubleJump;
});

export async function openDoubleJump() {
  const respElem = document.getElementById("response");
  respElem.textContent = "Waiting for double jump to respond...";

  Office.context.ui.displayDialogAsync(
    "https://127.0.0.1:3000/login.html",
    { height: 25, width: 20, promptBeforeOpen: false }, // We can avoid the prompt because the user is already clicking a button to trigger this event
    function (asyncResult: Office.AsyncResult<Office.Dialog>): void {
      if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
        console.log("Successfully opened the first dialog");
        const dialog = asyncResult.value;
        // Handle the response from the dialog
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg: any) => {
          console.log("Dialog message received");
          dialog.close();
          respElem.textContent = arg["message"];
        });
      } else {
        console.log("Error occurred when attempting to prompt: ");
        const err = asyncResult.error;
        console.log(err.name + ": " + err.message);
      }
    }
  );
}

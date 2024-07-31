const butInstall = document.getElementById("buttonInstall");

if (butInstall) {
    // Logic for installing the PWA
    // Event handler for `beforeinstallprompt` event
    window.addEventListener("beforeinstallprompt", (event) => {
        // Prevent the mini-infobar from appearing on mobile
        event.preventDefault();
        // Store the event so it can be triggered later.
        window.deferredPrompt = event;

        // Remove the hidden class from the button.
        butInstall.classList.remove("hidden");
    });

    // Event handler for the `butInstall` element
    butInstall.addEventListener("click", async () => {
        const promptEvent = window.deferredPrompt;

        console.log("promptEvent", promptEvent);

        if (!promptEvent) {
            return;
        }

        // Show the install prompt
        promptEvent.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await promptEvent.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // Reset the deferred prompt variable, it can only be used once.
        window.deferredPrompt = null;

        // Hide the install button
        butInstall.classList.add("hidden");
    });

    const isPWA = () =>
        !!(
            window.matchMedia?.("(display-mode: standalone)").matches ||
            window.navigator.standalone
        );

    // if are standalone android OR safari
    if (isPWA()) {
        // hidden the button
        butInstall.classList.add("hidden");
    }

    // Event handler for the `appinstalled` event
    window.addEventListener("appinstalled", (event) => {
        console.log("PWA was installed");
        // Clear the deferredPrompt so it can be garbage collected
        window.deferredPrompt = null;
    });
}

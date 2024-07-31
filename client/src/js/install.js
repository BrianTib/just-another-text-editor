const butInstall = document.getElementById("buttonInstall");

if (butInstall) {
    // Event handler for `beforeinstallprompt` event
    window.addEventListener("beforeinstallprompt", (event) => {
        // Prevent the mini-infobar from appearing on mobile
        event.preventDefault();
        // Store the event so it can be triggered later
        window.deferredPrompt = event;

        // Show the install button
        butInstall.classList.remove("hidden");
    });

    // Event handler for the `butInstall` element
    butInstall.addEventListener("click", async () => {
        const promptEvent = window.deferredPrompt;

        if (!promptEvent) {
            return;
        }

        // Show the install prompt
        promptEvent.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await promptEvent.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // Reset the deferred prompt variable
        window.deferredPrompt = null;

        // Hide the install button
        butInstall.classList.add("hidden");
    });

    // Function to check if the app is running in standalone mode
    const isPWA = () =>
        !!(
            window.matchMedia?.("(display-mode: standalone)").matches ||
            window.navigator.standalone
        );

    // Hide the install button if the app is already installed or running in standalone mode
    if (isPWA()) {
        butInstall.classList.add("hidden");
    }

    // Event handler for the `appinstalled` event
    window.addEventListener("appinstalled", () => {
        console.log("PWA was installed");
        window.deferredPrompt = null;
    });
}

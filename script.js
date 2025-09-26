// --- 1. Custom Alert/Message Modal (Better than window.alert) ---

/**
 * Creates a simple, non-blocking message box to give the user feedback.
 * @param {string} message The text to display in the message box.
 * @param {string} type 'success', 'info', or 'error' to define style.
 */
function showMessage(message, type = 'info') {
    // Check if a message box already exists and remove it to prevent stacking
    const existingMsg = document.getElementById('custom-message-box');
    if (existingMsg) {
        existingMsg.remove();
    }

    const msgBox = document.createElement('div');
    msgBox.id = 'custom-message-box';
    msgBox.textContent = message;

    // Apply basic styles for visibility and professionalism
    msgBox.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: opacity 0.5s, transform 0.5s;
        transform: translateY(-20px);
    `;

    // Set color based on type
    let bgColor = '#3498db'; // info (default)
    if (type === 'success') {
        bgColor = '#2ecc71';
    } else if (type === 'error') {
        bgColor = '#e74c3c';
    }
    msgBox.style.backgroundColor = bgColor;

    document.body.appendChild(msgBox);

    // Fade in
    setTimeout(() => {
        msgBox.style.opacity = '1';
        msgBox.style.transform = 'translateY(0)';
    }, 10);

    // Fade out and remove after 4 seconds
    setTimeout(() => {
        msgBox.style.opacity = '0';
        msgBox.style.transform = 'translateY(-20px)';
        msgBox.addEventListener('transitionend', () => msgBox.remove());
    }, 4000);
}


// --- 2. Simulated "Apply Now" Workflow ---

/**
 * Handles the 'Apply Now' click, simulating submission and status update.
 * @param {Event} event The click event object.
 */
function applyToJob(event) {
    // Prevent the default button action
    event.preventDefault();

    // The job card where the click occurred
    const jobCard = event.target.closest('.job-card');
    const jobTitle = jobCard.querySelector('h3').textContent;
    const jobCompany = jobCard.querySelector('p:not(.match-criteria)').textContent;

    // 1. Show a successful application message
    showMessage("Application Submitted! Sent for Mentor Approval.", 'success');

    // 2. Disable the button and change its text
    event.target.textContent = "Applied!";
    event.target.disabled = true;
    event.target.style.backgroundColor = '#ccc';
    event.target.style.cursor = 'not-allowed';

    // 3. Dynamically add the new application to the tracking list
    const trackingSection = document.querySelector('.application-tracking');

    const newTrackingItem = document.createElement('div');
    newTrackingItem.classList.add('tracking-item');

    // Create the HTML for the new tracking entry
    newTrackingItem.innerHTML = `
        <p>Project: <strong>${jobTitle}</strong> (${jobCompany})</p>
        <p class="status status-pending">Status: Applied (Pending Approval) ⏳</p>
    `;

    // Add the new item to the top of the tracking section
    if (trackingSection) {
        // Use insertBefore to place it at the beginning of the list
        trackingSection.prepend(newTrackingItem);
    }
}


// --- 3. Simulated "Tab Switching" for Navigation ---

/**
 * Handles clicks on the sidebar navigation links.
 * @param {Event} event The click event object.
 */
function handleNavigation(event) {
    event.preventDefault();

    // Get the navigation list item
    const listItem = event.currentTarget.closest('li');
    const linkText = event.currentTarget.textContent.trim().split(' ')[1];

    // De-activate all links
    document.querySelectorAll('.sidebar nav li').forEach(li => {
        li.classList.remove('active');
    });

    // Activate the clicked link
    listItem.classList.add('active');

    // Simple feedback simulation
    if (linkText === 'Dashboard') {
        showMessage('Dashboard loaded.', 'info');
    } else {
        showMessage(`Simulating loading the '${linkText}' view...`, 'info');
    }
}

// --- 4. Initialization: Attach Event Listeners when the DOM is Ready ---

document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners to all 'Apply Now' buttons
    const applyButtons = document.querySelectorAll('.btn-apply');
    applyButtons.forEach(button => {
        button.addEventListener('click', applyToJob);
    });

    // Attach event listeners to all sidebar navigation links
    const navLinks = document.querySelectorAll('.sidebar nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // The profile buttons don't navigate, but they should give feedback
    const profileBtns = document.querySelectorAll('.profile-btn');
    profileBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showMessage(`Opening ${e.target.textContent}...`, 'info');
        });
    });
});

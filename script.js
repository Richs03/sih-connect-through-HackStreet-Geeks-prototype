// --- Modal Functions ---
function showModal(title, message) {
    const modal = document.getElementById('custom-modal');
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('custom-modal').classList.add('hidden');
}

// --- Role Toggling Logic (Fixes the view switching issue) ---
function handleRoleToggle(role) {
    // 1. Hide all views and deactivate all buttons
    const views = document.querySelectorAll('.main-content > div:not(.header-bar)');
    views.forEach(view => {
        view.classList.add('hidden');
        view.classList.remove('active-view');
    });

    const buttons = document.querySelectorAll('.role-toggles .role-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 2. Show the selected view and activate the selected button
    let title = "";
    if (role === 'mentor') {
        document.getElementById('mentor-view').classList.remove('hidden');
        document.getElementById('mentor-view').classList.add('active-view');
        document.getElementById('mentor-toggle').classList.add('active');
        title = "Mentor Approval Portal";
    } else if (role === 'admin') {
        document.getElementById('admin-view').classList.remove('hidden');
        document.getElementById('admin-view').classList.add('active-view');
        document.getElementById('admin-toggle').classList.add('active');
        title = "Placement Cell Analytics & Posting";
    } else if (role === 'employer') {
        document.getElementById('employer-view').classList.remove('hidden');
        document.getElementById('employer-view').classList.add('active-view');
        document.getElementById('employer-toggle').classList.add('active');
        title = "Employer Candidate Shortlisting";
    }

    // 3. Update the main header title
    document.getElementById('portal-title').textContent = title;
}

// --- Mentor Approval Action Logic ---
function handleMentorAction(id, action) {
    const item = document.querySelector(`.approval-item[data-id="${id}"]`);
    if (item) {
        // Remove the item from the pending list
        item.remove();
        
        // Mock the total count update (in a real app, this would be dynamic)
        const pendingCountElement = document.querySelector('#mentor-view .section-title');
        const currentCountMatch = pendingCountElement.textContent.match(/\((\d+)\)/);
        if (currentCountMatch) {
            const currentCount = parseInt(currentCountMatch[1]);
            const newCount = currentCount > 0 ? currentCount - 1 : 0;
            pendingCountElement.textContent = `Pending Applications (${newCount})`;
        }

        // Show confirmation modal
        const status = action === 'approve' ? 'Approved' : 'Rejected';
        const message = `Application ID ${id} was successfully ${status}. It has been removed from the queue.`;
        showModal('Action Successful', message);
    }
}

// --- Admin Job Post Mock Logic ---
function simulateJobPost() {
    const company = document.getElementById('company').value;
    const role = document.getElementById('role').value;
    
    // Simple form validation check
    if (!company || !role) {
        showModal('Error', 'Please fill in the Company Name and Job Role before posting.');
        return;
    }

    const message = `The opportunity for '${role}' at ${company} has been successfully posted and instantly matched with eligible students.`;
    showModal('Opportunity Posted', message);
}

// --- Initialize the dashboard state on load (optional but good practice) ---
// Since 'mentor-view' starts as 'active-view' in HTML, no need to call handleRoleToggle('mentor')
// but we can ensure the title is set correctly if the initial HTML title is generic.
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('portal-title').textContent = "Mentor Approval Portal";
});

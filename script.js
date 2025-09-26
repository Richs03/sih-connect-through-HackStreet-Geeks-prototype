/**
 * Project: Connect through HackStreet Geeks
 * File: script.js
 * Description: Handles all client-side interactivity, including application submission,
 * mentor approval, opportunity posting, modal messages, and role toggling.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MODAL FUNCTIONS (Used across all pages for user feedback) ---

    const modal = document.getElementById('custom-modal');
    const modalMessage = document.getElementById('modal-message');
    const closeBtn = document.querySelector('.close-btn');

    /** Displays a custom message in the modal window. */
    const showModal = (message) => {
        modalMessage.textContent = message;
        modal.style.display = 'block';
    };

    /** Sets up the event listeners for closing the modal. */
    const setupModal = () => {
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.style.display = 'none';
            };
        }
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    };

    setupModal();


    // --- 2. STUDENT DASHBOARD LOGIC (index.html) ---

    /** Handles the "Apply Now" button click on the student dashboard. */
    const handleApplyNow = (event) => {
        const btn = event.target;
        if (btn.classList.contains('btn-apply')) {
            event.preventDefault();

            // Get job details from the card
            const jobCard = btn.closest('.job-card');
            const jobTitle = jobCard.querySelector('h3').textContent.trim();
            const companyName = jobCard.querySelector('p:nth-of-type(1)').textContent.trim();
            
            // Generate a simulated tracking item
            const appTracking = document.getElementById('appTracking');
            if (appTracking) {
                const newItem = document.createElement('div');
                newItem.classList.add('tracking-item');
                newItem.innerHTML = `
                    <p>Project: <strong>${jobTitle}</strong> (${companyName})</p>
                    <p class="status status-pending">Status: Applied (Pending Approval) ⏳</p>
                `;
                
                // Add new item to the top of the list
                appTracking.prepend(newItem);

                // Disable the button to prevent re-application
                btn.disabled = true;
                btn.textContent = 'Applied';
                btn.style.backgroundColor = '#7f8c8d';

                showModal(`Application submitted for ${jobTitle} at ${companyName}. Status: Pending Mentor Approval.`);
            }
        }
    };

    // Attach listener for the student page
    document.querySelector('.main-content')?.addEventListener('click', handleApplyNow);


    // --- 3. ADMINISTRATIVE PORTAL LOGIC (admin_and_mentor.html) ---

    const mentorContent = document.getElementById('mentor-content');
    const adminContent = document.getElementById('admin-content');
    const mainTitle = document.getElementById('admin-main-title');
    const roleToggleButtons = document.querySelectorAll('.role-toggle-btn');
    const mentorNav = document.getElementById('mentor-nav');
    const adminNav = document.getElementById('admin-nav');

    /** Handles the switching between Mentor and Placement Cell views. */
    const handleRoleToggle = (role) => {
        // Update content visibility
        if (role === 'mentor') {
            mentorContent.classList.remove('hidden-content');
            adminContent.classList.add('hidden-content');
            mainTitle.textContent = 'Mentor Approval Queue';
            mentorNav.classList.add('active');
            adminNav.classList.remove('active');
        } else if (role === 'admin') {
            mentorContent.classList.add('hidden-content');
            adminContent.classList.remove('hidden-content');
            mainTitle.textContent = 'Placement Cell Operations';
            mentorNav.classList.remove('active');
            adminNav.classList.add('active');
        }

        // Update button active state
        roleToggleButtons.forEach(btn => {
            if (btn.getAttribute('data-role') === role) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    /** Handles the Mentor's action (Approve/Reject) on an application. */
    const handleMentorAction = (event) => {
        const btn = event.target;
        if (btn.classList.contains('mentor-action')) {
            const action = btn.getAttribute('data-action');
            const approvalItem = btn.closest('.approval-item');
            const details = approvalItem.querySelector('.app-details p:nth-of-type(1)').textContent;
            
            if (action === 'approved') {
                showModal(`SUCCESS: ${details} has been **APPROVED**. The student is now eligible for the interview.`);
                // Visually update the item on the mentor's screen
                approvalItem.style.backgroundColor = '#d4edda'; // Light green background
                approvalItem.querySelector('.app-actions').innerHTML = '<p class="text-success">✅ Approved</p>';
            } else if (action === 'rejected') {
                showModal(`REJECTED: ${details} requires a follow-up query. Student will be notified to correct documentation.`);
                // Visually update the item on the mentor's screen
                approvalItem.style.backgroundColor = '#f8d7da'; // Light red background
                approvalItem.querySelector('.app-actions').innerHTML = '<p class="text-danger">❌ Rejected</p>';
            }
        }
    };
    
    /** Handles the Placement Cell's new job posting submission. */
    const handleOpportunityPost = (event) => {
        event.preventDefault();
        const jobTitle = document.getElementById('jobTitle').value;
        const companyName = document.getElementById('companyName').value;
        const requiredSkills = document.getElementById('requiredSkills').value;
        
        showModal(`Success! The opportunity "${jobTitle}" at ${companyName} has been posted and tagged with skills: ${requiredSkills}. Students will now see this opportunity.`);
        
        // Reset the form after success
        document.getElementById('opportunity-form').reset();
    };


    // Attach administrative listeners if elements exist
    if (mentorContent && adminContent) {
        // Attach event listeners for role toggle buttons
        roleToggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                handleRoleToggle(btn.getAttribute('data-role'));
            });
        });

        // Set default view to Mentor
        handleRoleToggle('mentor');
        
        // Attach listener for Mentor Actions (Approve/Reject)
        document.getElementById('mentor-content')?.addEventListener('click', handleMentorAction);

        // Attach listener for Placement Cell Form Submission
        document.getElementById('opportunity-form')?.addEventListener('submit', handleOpportunityPost);
        
        // Attach sidebar navigation listeners (optional, mirrors toggle buttons)
        mentorNav?.addEventListener('click', (e) => { e.preventDefault(); handleRoleToggle('mentor'); });
        adminNav?.addEventListener('click', (e) => { e.preventDefault(); handleRoleToggle('admin'); });

    }
});

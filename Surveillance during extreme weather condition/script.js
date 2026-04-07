document.addEventListener('DOMContentLoaded', () => {
    // Simulated realtime data
    const metrics = {
        windSpeed: { min: 110, max: 145, elementId: 'windSpeed', unit: 'mph' },
        rainFall: { min: 2.5, max: 4.5, elementId: 'rainFall', unit: 'in/hr' },
        temperature: { min: 76, max: 80, elementId: 'temperature', unit: '&deg;F' }
    };

    // Update real-time metrics periodically
    setInterval(() => {
        Object.keys(metrics).forEach(key => {
            const m = metrics[key];
            const newValue = (Math.random() * (m.max - m.min) + m.min).toFixed(key === 'windSpeed' || key === 'temperature' ? 0 : 1);
            const el = document.getElementById(m.elementId);
            
            // Check trend
            const currentVal = parseFloat(el.innerText);
            const trendEl = el.nextElementSibling;
            
            if (newValue > currentVal) {
                trendEl.className = 'trend up';
                trendEl.innerHTML = '<i class="fa-solid fa-arrow-up"></i> Rising';
            } else if (newValue < currentVal) {
                trendEl.className = 'trend down';
                trendEl.innerHTML = '<i class="fa-solid fa-arrow-down"></i> Falling';
            } else {
                trendEl.className = 'trend flat';
                trendEl.innerHTML = '<i class="fa-solid fa-minus"></i> Steady';
            }
            
            el.innerHTML = `${newValue} <span class="unit">${m.unit}</span>`;
        });
    }, 3000);

    // Simulate incident logs
    const logList = document.getElementById('logList');
    const logMessages = [
        { type: 'warning', text: 'CAM-02 detected localized flooding at junction.' },
        { type: 'critical', text: 'Anemometer 4 reports gusts exceeding 140mph.' },
        { type: 'info', text: 'Backup generator diagnostic passed.' },
        { type: 'warning', text: 'Visibility dropping below 0.25 miles.' }
    ];

    setInterval(() => {
        if (Math.random() > 0.7) {
            const event = logMessages[Math.floor(Math.random() * logMessages.length)];
            const now = new Date();
            const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            const li = document.createElement('li');
            li.className = `log-item ${event.type}`;
            li.innerHTML = `
                <span class="log-time">${timeString}</span>
                <span class="log-msg">${event.text}</span>
            `;
            
            logList.insertBefore(li, logList.firstChild);
            
            // Keep log count manageable
            if (logList.children.length > 8) {
                logList.removeChild(logList.lastChild);
            }
        }
    }, 5000);

    // Sidebar navigation logic
    const navLinks = document.querySelectorAll('#sidebar-nav li');
    const mainViews = document.querySelectorAll('.main-view');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Hide all views
            mainViews.forEach(view => {
                view.style.display = 'none';
            });
            
            // Show target view
            const targetId = link.getAttribute('data-target');
            if (targetId) {
                const targetView = document.getElementById(targetId);
                if (targetView) {
                    // Maintain grid display for dashboard if it's the dashboard
                    if (targetId === 'view-dashboard') {
                        targetView.style.display = 'block';
                    } else {
                        targetView.style.display = 'block';
                    }
                }
            }
        });
    });
});

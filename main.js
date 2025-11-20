// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === 'auth.html' && linkHref.includes('auth.html'))) {
            link.classList.add('font-semibold');
        }
    });

    // Simple chat demo functionality for homepage
    if (document.getElementById('chat-container')) {
        const chatContainer = document.getElementById('chat-container');
        const codeInput = document.getElementById('code-input');
        const sendButton = document.getElementById('send-button');

        sendButton.addEventListener('click', function() {
            const code = codeInput.value.trim();
            if (code) {
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'flex justify-end mb-4';
                userMessage.innerHTML = `
                    <div class="bg-blue-600 text-white p-4 rounded-lg max-w-3/4">
                        <pre class="text-sm whitespace-pre-wrap">${escapeHtml(code)}</pre>
                    </div>
                `;
                chatContainer.appendChild(userMessage);
                
                // Clear input
                codeInput.value = '';
                
                // Add loading indicator
                const loadingMessage = document.createElement('div');
                loadingMessage.className = 'flex mb-4';
                loadingMessage.innerHTML = `
                    <div class="bg-gray-200 p-4 rounded-lg max-w-3/4">
                        <p class="text-gray-600">Analyzing your code...</p>
                    </div>
                `;
                chatContainer.appendChild(loadingMessage);
                
                // Scroll to bottom
                chatContainer.scrollTop = chatContainer.scrollHeight;
                
                // Simulate AI response after delay
                setTimeout(function() {
                    // Remove loading message
                    chatContainer.removeChild(loadingMessage);
                    
                    // Add AI response
                    const aiResponse = document.createElement('div');
                    aiResponse.className = 'flex mb-4';
                    
                    // Simple code analysis (this would be replaced with actual AI in a real app)
                    const hasSemicolon = code.includes(';');
                    const hasConsoleLog = code.includes('console.log');
                    const hasSyntaxError = code.includes('error') || code.includes('undefined');
                    
                    let responseText = '';
                    if (hasSyntaxError) {
                        responseText = 'I found a potential syntax error in your code. Make sure all variables are properly defined and all brackets are closed.';
                    } else if (!hasSemicolon && (code.includes('let') || code.includes('const') || code.includes('var'))) {
                        responseText = 'Your JavaScript code looks good, but remember to add semicolons at the end of statements for better code style.';
                    } else if (hasConsoleLog) {
                        responseText = 'I see you\'re using console.log for debugging. This is a good practice during development!';
                    } else {
                        responseText = 'Your code looks clean! I didn\'t find any obvious errors. Would you like me to check for more complex issues?';
                    }
                    
                    aiResponse.innerHTML = `
                        <div class="bg-gray-200 p-4 rounded-lg max-w-3/4">
                            <p class="text-gray-800">${responseText}</p>
                            <div class="mt-2 text-sm text-gray-600">
                                <button class="text-blue-600 hover:underline">Explain in detail</button>
                                <button class="ml-3 text-blue-600 hover:underline">Show fixed code</button>
                            </div>
                        </div>
                    `;
                    chatContainer.appendChild(aiResponse);
                    
                    // Scroll to bottom
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }, 2000);
            }
        });
        
        // Allow pressing Enter to send (but Shift+Enter for new line)
        codeInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendButton.click();
            }
        });
    }
});

// Helper function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
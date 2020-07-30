['script.js','scriptSlick.js'].forEach(function(src) {
                var script = document.createElement('script');
                script.src = src;
                script.async = false;
                document.head.appendChild(script);
            });

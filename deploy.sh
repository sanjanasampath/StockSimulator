echo "Pulling from Repo"

ssh root@audasynth-server "/root/audasynth-dashbored/auda-synth-ui && git pull && npm install && npm run build && serve -s build  -l 3000"

pm2 list
pm2 start server.js

sudo cp -r /root/audasynth-dashbored/auda-synth-ui/build/* /var/www/auda-synth-ui/


bubble app.audasynth.com 104.19.241.93
require('dotenv').config();
const path=require('path'),express=require('express'),helmet=require('helmet'),cors=require('cors'),rateLimit=require('express-rate-limit'),db=require('./src/db'),{startReminderJob}=require('./src/reminders');
const app=express();app.use(helmet({contentSecurityPolicy:false}));app.use(cors());app.use(express.json({limit:'1mb'}));app.use('/api/auth',rateLimit({windowMs:15*60*1000,max:30}));
app.get('/api/health',async(req,res)=>{try{await db.query('SELECT 1');res.json({status:'ok',database:'connected'});}catch{res.status(503).json({status:'error',database:'unavailable'});}});
app.use('/api/auth',require('./src/routes/auth'));app.use('/api/medications',require('./src/routes/medications'));app.use('/api/doses',require('./src/routes/doses'));app.use('/api/doctors',require('./src/routes/doctors'));app.use('/api/dashboard',require('./src/routes/dashboard'));
app.use(express.static(path.join(__dirname,'public')));app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
app.use((err,req,res,next)=>{console.error(err);if(err.code==='ER_DUP_ENTRY')return res.status(409).json({error:'That record already exists.'});res.status(500).json({error:process.env.NODE_ENV==='production'?'Something went wrong.':'Server error. Check server logs.'});});
const port=Number(process.env.PORT||3000);app.listen(port,()=>{console.log('DoseTrack running at http://localhost:'+port);startReminderJob();});

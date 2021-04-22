
const TaskCtrl = require('../controllers/task-controller');
const middleware = require('../middlewares/middleware')
const express = require('express');
const router = express.Router();

router.use(middleware.authToken);

router.route('/')
    .get(TaskCtrl.showTaks)
    .post(TaskCtrl.newTask);

router.get('/CompletTasks', TaskCtrl.getCompletTasks);
router.get('/EndWithJS', TaskCtrl.getEndWithJS);
router.get('/MastStartNComplet', TaskCtrl.getMastStartNComplet);
router.get('/PremNoComplOfYearAgo', TaskCtrl.getPremNoComplOfYearAgo);
router.get('/Special', TaskCtrl.getSpecial);

router.route('/SetFalseAllMaterTasks').put(TaskCtrl.setFalseAllMaterTasks);
router.route('/SetTrueFirstReactTasks').put(TaskCtrl.setTrueFirstReactTasks);

router.route('/DeleteNewTasks').delete(TaskCtrl.deleteNewTasks);

router.route('/:id')
    .get(TaskCtrl.getTaskById)
    .put( TaskCtrl.editTask)
    .delete(TaskCtrl.deleteTask);


module.exports = router;

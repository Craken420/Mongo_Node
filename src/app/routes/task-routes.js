
var TaskCtrl = require('../controllers/task-controller');
var express = require('express');
var router = express.Router();

router.route('/')
    .get(TaskCtrl.showTaks)
    .post(TaskCtrl.newTask);

router.get('/CompletTasks', TaskCtrl.getCompletTasks);
router.get('/EndWithJS', TaskCtrl.getEndWithJS);
router.get('/MastStartNComplet', TaskCtrl.getMastStartNComplet);
router.get('/PremNoComplOfYearAgo', TaskCtrl.getPremNoComplOfYearAgo);
router.get('/Special', TaskCtrl.getSpecial);

router.route('/SetFalseAllMaterTasks').put(TaskCtrl.setFalseAllMaterTasks);
router.route('/SetTrueAllMaterTasks').put(TaskCtrl.setTrueAllMaterTasks);

router.route('/DeleteNewTasks').delete(TaskCtrl.deleteNewTasks);

router.route('/:id')
    .get(TaskCtrl.getTaskById)
    .put( TaskCtrl.editTask)
    .delete(TaskCtrl.deleteTask);


module.exports = router;

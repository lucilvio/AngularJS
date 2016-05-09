angular.module("sample", []).controller("todoController", function() {

    this.tarefasAbertas = 1;
    this.totalDeTarefas = 1;

    this.tasks = [{
        titulo: "Tarefa 1",
        concluida: false
    }];

    this.adicionarTarefa = function() {
        this.tasks.push({
            titulo: this.newTask,
            concluida: false
        });
        
        this.newTask = '';
        
        this.atualizarNumeroDeTarefas();
    }
    
    this.arquivar = function() {
        var newTasks = [];
        
        this.tasks.forEach(function(element) {
            if(!element.concluida) {
                newTasks.push(element);
            }
        }, this);
        
        this.tasks = newTasks;
        
        this.atualizarNumeroDeTarefas();
    }

    this.marcarConcluida = function($event, task) {
        var $check = $event.currentTarget.children[0];
        var $texto = $event.currentTarget.children[1];

        if ($check.checked) {
            $texto.className = "concluida";
            this.tasks[this.tasks.indexOf(task)].concluida = true;
        } else {
            $texto.className = "aberta";
            this.tasks[this.tasks.indexOf(task)].concluida = false;
        }
        
        this.atualizarNumeroDeTarefas();
    }
    
    this.atualizarNumeroDeTarefas = function() {
        var abertas = 0;
        
        this.tasks.forEach(function(e) {
           if(!e.concluida) {
               abertas++;
           } 
        });
        
        this.tarefasAbertas = abertas;
        this.totalDeTarefas = this.tasks.length; 
    }

});
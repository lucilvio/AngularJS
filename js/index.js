angular.module("sample", []).controller("todoController", function($http) {
    var self = this;

    var api = "http://lucilvio-api.azurewebsites.net/api";

    this.tarefasAbertas = 1;
    this.totalDeTarefas = 1;

    this.tasks = [];

    this.atualizarNumeroDeTarefas = function() {
        var abertas = 0;

        this.tasks.forEach(function(e) {
            if (!e.concluida) {
                abertas++;
            }
        });

        this.tarefasAbertas = abertas;
        this.totalDeTarefas = this.tasks.length;
    }

    this.listarTarefas = function() {
        $http.get(api + "/tasks").then(function(response) {
            self.tasks = [];

            if (response.data) {
                response.data.forEach(function(element) {
                    self.tasks.push(element);
                }, this);
            }
            
            self.atualizarNumeroDeTarefas();
        });
    }

    this.adicionarTarefa = function() {
        $http.post(api + "/tasks", {
            Descricao: this.newTask
        }).then(function(repsonse) {
            self.newTask = '';
            self.atualizarNumeroDeTarefas();

            self.listarTarefas();
        });
    }

    this.arquivar = function() {
        var newTasks = [];

        this.tasks.forEach(function(element) {
            if (!element.concluida) {
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

    this.listarTarefas();

});
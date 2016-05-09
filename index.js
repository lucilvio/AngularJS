angular.module("sample", []).controller("todoController", function() {
   
    this.tasks = [
        {
            titulo: "Tarefa 1"
        },
        {
            titulo: "Tarefa 2"
        }
    ]
    
    this.adicionarTarefa = function() {
        this.tasks.push({ titulo: this.newTask })
        this.newTask = '';
    }
    
    this.marcarConcluida = function() {
        if(this.concluida) {
            this.classConcluida = "concluida";
        }
        else {
                this.classConcluida = "";
        }
    }
    
});
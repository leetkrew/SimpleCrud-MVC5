var initializePage = {
    init: function () {
        if (typeof console._commandLineAPI !== 'undefined') {
            console.API = console._commandLineAPI;
        } else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
            console.API = console._inspectorCommandLineAPI;
        } else if (typeof console.clear !== 'undefined') {
            console.API = console;
        }

        if (typeof tmce2 !== 'undefined') {
            tmce2.init();
        }
    },

    checkHomeIndex: function () {
        if (typeof HomeIndex !== 'undefined' && HomeIndex !== null) {
            HomeIndex.Load();
        }
    },

    checkHomeInsertEmployee: function () {
        if (typeof HomeInsertEmployee !== 'undefined' && HomeInsertEmployee !== null) {
            HomeInsertEmployee.Load();
        }
    }

};
var beaut = require("js-beautify").js_beautify,
fs = require('fs'),
path = require("path");

var dir;
if (process.argv[2]) {
	dir = process.argv[2];
} else {
	throw "Please specify path as a parameter"
}

(function beautifyFiles(directory) {

	fs.readdir(directory, function (err, files) {

		if (err)
			throw err;

		files.forEach(function (file) {

			file = path.resolve(directory, file);

			if (/\.js$/.test(file)) {

				console.log(file);

				fs.readFile(file, {
					encoding : "utf8"
				}, function (err, data) {

					if (err)
						throw err;

					var beautified = beaut(data, {
							indent_size : 2
						});

					fs.writeFile(file, beautified, function (err) {
						if (err)
							throw err;
					});

				});
			} else {

				fs.stat(file, function (err, stat) {

					if (err)
						throw err;

					if (stat && stat.isDirectory()) {

						beautifyFiles(file);

					}

				});
			}
		});
	});

})(dir);

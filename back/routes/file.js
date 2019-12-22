const express = require("express");
const router = express.Router();
const uniqueFilename = require("unique-filename");
require("dotenv").config();

const File = require("../models/file");
const Candidate = require("../models/candidate");

const pathNameCreator = () => {
    let uniqueNumber = uniqueFilename(`${process.env.FOLDER}`);
    let date_ob = new Date().toString();

    uniqueNumber = uniqueNumber.split("\\").pop();

    let path = date_ob.slice(0, date_ob.indexOf(":") - 3).split(" ").join("_") + uniqueNumber + "_";

    return path;
};

router.post("/fileUpload", function(req, res) {
    const condition = { include: [{ model: File }] };

    let pk = null;
    let fileInfo = {};
    let form = new require("formidable").IncomingForm();

    form.maxFileSize = 5 * 1024 * 1024;

    const path = pathNameCreator();

    form.onPart = function(part) {
        if (!part.filename || part.filename.match(/\.(docx|txt|doc|pdf)$/i)) {
            form.handlePart(part);
        } else {
            console.log(part.filename + " is not allowed");
        }
    };

    form.parse(req, (err, fields, files) => {
        if (!files.file) return;

        let file = files.file;
        pk = parseInt(fields.pk);

        fileInfo = Object.assign({}, {
            filename: file.name,
            path: path + file.name,
            type: file.type,
            size: file.size,
            lastModifiedDate: file.lastModifiedDate
        });
    });

    form.on("fileBegin", function(name, file, fields) {
        file.path = `${process.env.FOLDER}` + path + file.name;
    });

    form.on("file", function(name, file) {
        console.log("Received file ---------> " + file.name);
    });

    form.on("error", err => {
        msj = err.Error;
        console.log(" -------------->  ERROR", msj);
        res.send("File size exceeds limit");
    });

    form.on("end", () => {
        if (fileInfo.filename) {
            File.create(fileInfo).then(file => {
                Candidate.findByPk(pk, condition).then(candidate => {
                    console.log("Relacionando archivo: ", file.dataValues.id, " con el candidato: ", candidate.dataValues.id)
                    candidate.setFiles([file.dataValues.id]).then(() => res.send("File uploaded sucessfully"));
                });
            });
        } else {
            res.send("Filetype not allowed");
        }
    });
});

router.get("/", (req, res) => {
    const fileName = req.query.fileName;

    res.sendFile(`${process.env.FOLDER}` + fileName, err => {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log("Sent:", fileName);
        }
    });
});

module.exports = router;
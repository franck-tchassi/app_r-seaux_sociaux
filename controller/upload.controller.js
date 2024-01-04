const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);


module.exports.uploadProfil = async (req, res) => {
    try {
        if (
            req.file.detectedMimeType !== "image/jpg" &&
            req.file.detectedMimeType !== "image/png" &&
            req.file.detectedMimeType !== "image/jpeg"
        )
            throw Error("Format de fichier non valide");

        if (req.file.size > 500000) throw Error("Taille maximale dépassée");
    } catch (err) {
        // Gestion des erreurs
        return res.status(400).json({ error: err.message });
    }

    const fileName = req.body.name + ".jpg";

    try {
        // Utilisation de la fonction pipeline pour gérer le flux
        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/profil/${fileName}`
            )
        );

        // Réponse réussie
        res.status(200).json({ success: true, message: "Upload réussi" });
    } catch (error) {
        // Gestion des erreurs lors de l'écriture du fichier
        res.status(500).json({ error: "Erreur lors de l'upload du fichier" });
    }
};
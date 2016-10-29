var groupHomeModel = require('../models/groupHomeModel.js');

/**
 * groupHomeController.js
 *
 * @description :: Server-side logic for managing groupHomes.
 */
module.exports = {

    /**
     * groupHomeController.list()
     */
    list: function (req, res) {
        groupHomeModel.find(function (err, groupHomes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting groupHome.',
                    error: err
                });
            }
            return res.json(groupHomes);
        });
    },

    /**
     * groupHomeController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        groupHomeModel.findOne({_id: id}, function (err, groupHome) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting groupHome.',
                    error: err
                });
            }
            if (!groupHome) {
                return res.status(404).json({
                    message: 'No such groupHome'
                });
            }
            return res.json(groupHome);
        });
    },

    /**
     * groupHomeController.create()
     */
    create: function (req, res) {
        var groupHome = new groupHomeModel({			name : req.body.name,			address : req.body.address,			phone : req.body.phone,			caretakers : req.body.caretakers,			participants : req.body.participants
        });

        groupHome.save(function (err, groupHome) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating groupHome',
                    error: err
                });
            }
            return res.status(201).json(groupHome);
        });
    },

    /**
     * groupHomeController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        groupHomeModel.findOne({_id: id}, function (err, groupHome) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting groupHome',
                    error: err
                });
            }
            if (!groupHome) {
                return res.status(404).json({
                    message: 'No such groupHome'
                });
            }

            groupHome.name = req.body.name ? req.body.name : groupHome.name;			groupHome.address = req.body.address ? req.body.address : groupHome.address;			groupHome.phone = req.body.phone ? req.body.phone : groupHome.phone;			groupHome.caretakers = req.body.caretakers ? req.body.caretakers : groupHome.caretakers;			groupHome.participants = req.body.participants ? req.body.participants : groupHome.participants;			
            groupHome.save(function (err, groupHome) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating groupHome.',
                        error: err
                    });
                }

                return res.json(groupHome);
            });
        });
    },

    /**
     * groupHomeController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        groupHomeModel.findByIdAndRemove(id, function (err, groupHome) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the groupHome.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

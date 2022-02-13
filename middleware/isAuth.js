const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 const authHeader = req.get('Authorization');

 if(!authHeader){
     const er = new Error('not authenticated');
     res.status(401).json({message: er.message});
 };

 const token = authHeader.split(' ')[1];

 let decodeToken;
 try {
     decodeToken = jwt.verify(token, process.env.JWT_SECRET);
 } catch (error) {
    const er = new Error('Error in decode token or login again or do signup');
    res.status(500).json({message: er.message});
 }

 if(!decodeToken){
    const er = new Error('not authenticated');
    res.status(401).json({message: er.message});
 }

 req.userId = decodeToken.userId;
 req.role = decodeToken.userRole;
 next();
};
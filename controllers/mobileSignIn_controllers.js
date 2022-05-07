exports.MobileSignIn = (req, res) => {
    const phone = req.body.phone;
    const otp = Math.floor(Math.random() * 899999 + 100000);
    client.set(phone.toString(), otp.toString(), "EX", 120, (err, res2) => {
        console.log(res2, "saved");
    });
    // send otp on the phone number
    res.status(200).send({
        otp: otp
    })
}

exports.VerifyOTP = (req, res) => {
    const otp = req.body.otp;
    const phone = req.body.phone;
    const token = uuidv1();
    client.get(phone.toString(), (err, resp) => {
        if (otp === resp) {
            const sql = `select id from User where phone = ${phone}`;
            db.query(sql, (err, res0) => {
                if (err) throw err;
                else {
                    if (res0.length == 0) {
                        const sql = `INSERT INTO User VALUES ('${token}', '', '', '', '', null, now(), "profile/image.jpeg",0, ${phone});`;
                        db.query(sql, (err, res1) => {
                            if (err) throw err;
                            else {

                                res.status(201).json(token);
                            }
                        })
                    }
                    else {
                        console.log(res0);
                        res.status(201).json(token);
                    }
                }
            })
        }
        else {
            console.log(otp)
            console.log(resp)
            res.status(403).send({
                message: "invalid_otp",
            })
        }
    });

}
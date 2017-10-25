UPDATE appointments
SET tip = $2, pay_mth = $3, total = $4
WHERE a_id = $1 
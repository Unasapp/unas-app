UPDATE appointments
SET status = $2
WHERE a_id = $1 
returning *
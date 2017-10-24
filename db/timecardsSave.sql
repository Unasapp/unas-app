UPDATE timecards
SET time_in = $2, time_out = $3
WHERE t_id = $1 
returning *

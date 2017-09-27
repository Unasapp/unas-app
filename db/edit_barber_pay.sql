update barbers
  set type = $1, rate = $2
  where b_id = $3
  returning *

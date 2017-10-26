update services
  set
    service = $1,
    price = $2,
    est_time = $3
  where
    v_id = $4
  returning *

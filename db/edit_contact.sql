update clients
  set
    c_first = $1,
    c_last = $2,
    c_phone = $3,
    c_email = $4,
    b_day = $5
  where 
    c_id = $6
  returning * ;
  

update
  appointments
set
  status = $2
where
  a_id = $1
returning *

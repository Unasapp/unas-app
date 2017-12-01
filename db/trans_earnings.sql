select distinct * from appointments, barbers
where b_id = barber_id 
and shop_id = $1
and status = 'completed'
and start_time between $2 and $3;
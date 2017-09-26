UPDATE appointments
SET barber_id = $2, client_id = $3, service_id = $4, shop_id = $5, start_time = $6, end_time = $7
WHERE a_id = $1 
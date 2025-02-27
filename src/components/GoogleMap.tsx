export default function GoogleMap({address}: {address: string}) {
    const encodedAddress= encodeURIComponent(address);
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    return (
        <div className="flex justify-center">
            <iframe 
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`}
                width="300" 
                height="300" 
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
             
        </div>
    )
}
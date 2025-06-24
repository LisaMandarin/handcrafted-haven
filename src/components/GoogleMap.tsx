export default function GoogleMap({address}: {address: string}) {
    const encodedAddress= encodeURIComponent(address);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    console.log('apiKey: ', apiKey);
    
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
module Estimator

export eive



import ..CGA: cga
import ..SimpleEiveResult
import Random: AbstractRNG, MersenneTwister



"""
    eive(;
    dirtyx::Vector{T},
    y::Vector{T},
    otherx::Union{Nothing, Matrix{T}, Vector{T}},
    popsize::Int = 50,
    numdummies::Int = 10,
    rng::RNGType = MersenneTwister(1234))::SimpleEiveResult where {T<:Real, RNGType<:AbstractRNG}

# Description:
The method searches for a set of dummy (binary) variables that separates the erroneous independent variable
into clean part and error part. The clean part is then used in the main regression estimation. 
Those dummy variables minimize the sum of squares of residuals of the main regression. In other terms
the methods searches for a set of proxy variables that do not exist in real. Please see the reference for details.  

# Arguments:

- dirtyx: Independent variable measured with some error
- y: Dependent variable
- otherx: Matrix of other independent variables
- popsize: Number of individuals in the population (optional)
- numdummies: Number of dummy variables to use (optional)
- rng: Random number generator (optional)

# Examples

```julia-repl
julia> import Random
julia> using ErrorsInVariables
julia> rng = Random.MersenneTwister(1234)
julia> n = 30
julia> deltax = randn(rng, n) * sqrt(3.0)
julia> cleanx = randn(rng, n) * sqrt(7.0)
julia> e = randn(rng, n) * sqrt(5.0)
julia> y = 20.0 .+ 10.0 .* cleanx .+ e
julia> dirtyx = cleanx + deltax
julia> eive(dirtyx = dirtyx, y = y, otherx = nothing) 

EiveResult([20.28458307772922, 9.456757289676714])

julia> X = hcat(ones(n), dirtyx);

julia> # Biased OLS estimates:
julia> X \\ y
2-element Vector{Float64}:
 17.94867860059858
  5.8099584879737876
```

# References 

Satman, M. Hakan, and Erkin Diyarbakirlioglu. "Reducing errors-in-variables bias in linear 
regression using compact genetic algorithms." Journal of Statistical Computation and Simulation
 85.16 (2015): 3216-3235.

"""
function eive(;
    dirtyx::Vector{T},
    y::Vector{T},
    otherx::Union{Nothing, Matrix{T}, Vector{T}},
    popsize::Int = 50,
    numdummies::Int = 10,
    rng::RNGType = MersenneTwister(1234))::SimpleEiveResult where {T<:Real, RNGType<:AbstractRNG}

    if isnothing(otherx)
        return eivewithoutotherx(dirtyx, y, popsize, numdummies, rng)
    else
        return eivewithotherx(dirtyx, y, otherx, popsize, numdummies, rng)
    end
end


"""
    eivewithotherx(
    dirtyx::Vector{T},
    y::Vector{T},
    otherx::Union{Matrix{T}, Vector{T}},
    popsize::Int = 50,
    numdummies::Int = 10,
    rng::RNGType = MersenneTwister(1234)
)::EiveResult where {T<:Real, RNGType<:AbstractRNG}
"""
function eivewithotherx(
    dirtyx::Vector{T},
    y::Vector{T},
    otherx::Union{Matrix{T}, Vector{T}},
    popsize::Int = 50,
    numdummies::Int = 10,
    rng::RNGType = MersenneTwister(1234))::SimpleEiveResult where {T<:Real, RNGType<:AbstractRNG}


    n = length(dirtyx)

    myones = ones(Float64, n)
    
    chsize = n * numdummies


    function costfn(bits::Vector{Int})
        auxX = reshape(bits, n, numdummies)
        betas = auxX \ dirtyx
        cleanX = auxX * betas

        X = hcat(myones, cleanX, otherx)

        outerbetas = X \ y
        res = y .- X * outerbetas

        return sum(res .^ 2.0)
    end

    finalbits = cga(chsize = chsize, costfunction = costfn, popsize = popsize, rng = rng)

    auxX = reshape(finalbits, n, numdummies)
    betas = auxX \ dirtyx
    cleanX = auxX * betas

    X = hcat(myones, cleanX, otherx)

    outerbetas = X \ y

    return SimpleEiveResult(outerbetas, true)
end


"""
    eivewithoutotherx(
    dirtyx::Vector{T},
    y::Vector{T},
    popsize::Int = 50,
    numdummies::Int = 10,
    rng::RNGType = MersenneTwister(1234))::EiveResult where {T<:Real, RNGType<:AbstractRNG}
"""
function eivewithoutotherx(
    dirtyx::Vector{T},
    y::Vector{T},
    popsize::Int = 50,
    numdummies::Int = 10,
    rng::RNGType = MersenneTwister(1234))::SimpleEiveResult where {T<:Real, RNGType<:AbstractRNG}


    n = length(dirtyx)

    myones = ones(Float64, n)
    
    chsize = n * numdummies


    function costfn(bits::Vector{Int})
        auxX = reshape(bits, n, numdummies)
        betas = auxX \ dirtyx
        cleanX = auxX * betas

        X = hcat(myones, cleanX)

        outerbetas = X \ y
        res = y .- X * outerbetas
        return sum(res .^ 2.0)
    end

    finalbits = cga(chsize = chsize, costfunction = costfn, popsize = popsize, rng = rng)

    auxX = reshape(finalbits, n, numdummies)
    betas = auxX \ dirtyx
    cleanX = auxX * betas

    X = hcat(myones, cleanX)

    outerbetas = X \ y

    return SimpleEiveResult(outerbetas, true)
end


end # end of module
